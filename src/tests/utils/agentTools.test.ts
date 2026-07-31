import { afterEach, describe, expect, test, vi } from 'vitest';

import { registerAgentTools } from '@utils/agentTools';

type CapturedTool = {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (input: Record<string, unknown>) => Promise<string | null>;
  annotations?: Record<string, boolean>;
};

/** Simula el `document.modelContext` que expone un browser con WebMCP. */
function withModelContext() {
  const tools: CapturedTool[] = [];
  const signals: (AbortSignal | undefined)[] = [];

  Object.defineProperty(document, 'modelContext', {
    configurable: true,
    value: {
      registerTool: async (tool: CapturedTool, opts?: { signal?: AbortSignal }) => {
        tools.push(tool);
        signals.push(opts?.signal);
      },
    },
  });

  return { tools, signals };
}

afterEach(() => {
  // @ts-expect-error limpiamos el mock entre tests
  delete document.modelContext;
  vi.restoreAllMocks();
});

function deps(overrides: Partial<Parameters<typeof registerAgentTools>[0]> = {}) {
  return {
    navigate: vi.fn(),
    searchBooks: vi.fn().mockResolvedValue([]),
    ...overrides,
  };
}

describe('registerAgentTools', () => {
  test('no explota y devuelve un noop si el browser no soporta WebMCP', () => {
    const cleanup = registerAgentTools(deps());
    expect(cleanup).toBeTypeOf('function');
    expect(() => cleanup()).not.toThrow();
  });

  test('registra las tres tools con un AbortSignal', async () => {
    const { tools, signals } = withModelContext();
    registerAgentTools(deps());
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    expect(tools.map((t) => t.name)).toEqual([
      'search_books',
      'open_book',
      'filter_books',
    ]);
    expect(signals.every((s) => s instanceof AbortSignal)).toBe(true);
  });

  test('cada tool declara un schema de objeto con sus required', async () => {
    const { tools } = withModelContext();
    registerAgentTools(deps());
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    for (const tool of tools) {
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.inputSchema.type).toBe('object');
      expect(tool.inputSchema.required?.length).toBeGreaterThan(0);
      for (const key of tool.inputSchema.required ?? []) {
        expect(tool.inputSchema.properties).toHaveProperty(key);
      }
    }
  });

  test('search_books marca readOnly y formatea los resultados con su URL', async () => {
    const { tools } = withModelContext();
    const searchBooks = vi
      .fn()
      .mockResolvedValue([
        { title: 'Rayuela', authors: ['Cortázar'], pathUrl: 'rayuela-abc' },
      ]);
    registerAgentTools(deps({ searchBooks }));
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    const search = tools.find((t) => t.name === 'search_books')!;
    expect(search.annotations?.readOnlyHint).toBe(true);
    expect(search.annotations?.untrustedContentHint).toBe(true);

    const out = await search.execute({ query: 'rayuela' });
    expect(searchBooks).toHaveBeenCalledWith('rayuela');
    expect(out).toBe(
      '- Rayuela — Cortázar (https://www.xbureads.com/book/view/rayuela-abc)',
    );
  });

  test('search_books rechaza queries cortas sin llamar a la API', async () => {
    const { tools } = withModelContext();
    const searchBooks = vi.fn();
    registerAgentTools(deps({ searchBooks }));
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    const search = tools.find((t) => t.name === 'search_books')!;
    expect(await search.execute({ query: 'ra' })).toMatch(/al menos 3/);
    expect(searchBooks).not.toHaveBeenCalled();
  });

  test('search_books no propaga errores de la API', async () => {
    const { tools } = withModelContext();
    const searchBooks = vi.fn().mockRejectedValue(new Error('500'));
    registerAgentTools(deps({ searchBooks }));
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    const search = tools.find((t) => t.name === 'search_books')!;
    await expect(search.execute({ query: 'rayuela' })).resolves.toMatch(
      /No se pudo completar/,
    );
  });

  test('open_book navega al detalle y devuelve null', async () => {
    const { tools } = withModelContext();
    const d = deps();
    registerAgentTools(d);
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    const open = tools.find((t) => t.name === 'open_book')!;
    expect(await open.execute({ pathUrl: 'rayuela-abc' })).toBeNull();
    expect(d.navigate).toHaveBeenCalledWith('/book/view/rayuela-abc');
  });

  test('filter_books valida el campo antes de navegar', async () => {
    const { tools } = withModelContext();
    const d = deps();
    registerAgentTools(d);
    await vi.waitFor(() => expect(tools).toHaveLength(3));

    const filter = tools.find((t) => t.name === 'filter_books')!;
    expect(await filter.execute({ field: 'autor', value: 'x' })).toMatch(
      /year, language, category/,
    );
    expect(d.navigate).not.toHaveBeenCalled();

    expect(
      await filter.execute({ field: 'category', value: 'Fantasía' }),
    ).toBeNull();
    expect(d.navigate).toHaveBeenCalledWith('/books/filter/category/Fantas%C3%ADa');
  });

  test('abortar el cleanup no lanza', async () => {
    const { signals } = withModelContext();
    const cleanup = registerAgentTools(deps());
    await vi.waitFor(() => expect(signals).toHaveLength(3));

    cleanup();
    expect(signals[0]?.aborted).toBe(true);
  });
});

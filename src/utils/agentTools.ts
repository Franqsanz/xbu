/**
 * WebMCP: expone acciones de la app como "tools" que un browser agéntico puede
 * invocar, en vez de obligarlo a deducirlas del DOM.
 *
 * La API está en preview (Chrome 150 movió `navigator.modelContext` a
 * `document.modelContext`), así que todo va detrás de feature detection y
 * try/catch: si el browser no la trae, esto no hace nada.
 *
 * Baja de tools: se pasa un AbortSignal en el registro y se aborta al
 * desmontar; no hay `unregisterTool`.
 */
type ToolAnnotations = {
  /** La tool no muta estado: el agente puede llamarla sin confirmación. */
  readOnlyHint?: boolean;
  /** Lo que devuelve viene de usuarios, no del sitio. */
  untrustedContentHint?: boolean;
};

type JsonSchema = {
  type: 'object';
  properties: Record<string, unknown>;
  required?: string[];
};

// `execute` devuelve el resultado como string, o null cuando dispara navegación.
type AgentTool = {
  name: string;
  description: string;
  inputSchema: JsonSchema;
  execute: (input: Record<string, never>) => Promise<string | null>;
  annotations?: ToolAnnotations;
};

type ModelContext = {
  registerTool: (
    tool: AgentTool,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

type SearchedBook = {
  title?: string;
  authors?: string[];
  pathUrl?: string;
};

export type AgentToolsDeps = {
  navigate: (path: string) => void;
  searchBooks: (query: string) => Promise<unknown>;
};

const SITE = 'https://www.xbureads.com';
const MIN_QUERY = 3;
const MAX_RESULTS = 10;
const FILTER_FIELDS = ['year', 'language', 'category'] as const;

function getModelContext(): ModelContext | undefined {
  if (typeof document === 'undefined') return undefined;
  const ctx = (document as Document & { modelContext?: ModelContext }).modelContext;
  return typeof ctx?.registerTool === 'function' ? ctx : undefined;
}

function formatBooks(result: unknown): string {
  if (!Array.isArray(result) || result.length === 0) {
    return 'Sin resultados.';
  }

  return (result as SearchedBook[])
    .slice(0, MAX_RESULTS)
    .map((book) => {
      const authors = book.authors?.length ? book.authors.join(', ') : 'sin autor';
      const url = book.pathUrl ? `${SITE}/book/view/${book.pathUrl}` : 'sin URL';
      return `- ${book.title ?? 'sin título'} — ${authors} (${url})`;
    })
    .join('\n');
}

function buildTools({ navigate, searchBooks }: AgentToolsDeps): AgentTool[] {
  return [
    {
      name: 'search_books',
      description:
        'Busca libros publicados en XBuReads por título o autor y devuelve los resultados con su URL. No cambia la página.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: `Texto a buscar (mínimo ${MIN_QUERY} caracteres), por título o autor.`,
          },
        },
        required: ['query'],
      },
      // Los títulos y autores los cargan usuarios: contenido no confiable.
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async (input) => {
        const query = String((input as { query?: unknown }).query ?? '').trim();
        if (query.length < MIN_QUERY) {
          return `La búsqueda necesita al menos ${MIN_QUERY} caracteres.`;
        }
        try {
          return formatBooks(await searchBooks(query));
        } catch {
          return 'No se pudo completar la búsqueda.';
        }
      },
    },
    {
      name: 'open_book',
      description:
        'Abre la página de detalle de un libro de XBuReads (sinopsis, autores, calificaciones y comentarios) a partir de su pathUrl, que devuelve search_books.',
      inputSchema: {
        type: 'object',
        properties: {
          pathUrl: {
            type: 'string',
            description:
              'Slug del libro, el último segmento de una URL /book/view/{pathUrl}.',
          },
        },
        required: ['pathUrl'],
      },
      execute: async (input) => {
        const pathUrl = String(
          (input as { pathUrl?: unknown }).pathUrl ?? '',
        ).trim();
        if (!pathUrl) return 'Falta el pathUrl del libro.';
        navigate(`/book/view/${encodeURIComponent(pathUrl)}`);
        return null;
      },
    },
    {
      name: 'filter_books',
      description:
        'Muestra el listado de libros de XBuReads filtrado por año, idioma o categoría.',
      inputSchema: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            enum: [...FILTER_FIELDS],
            description: 'Campo por el que filtrar.',
          },
          value: {
            type: 'string',
            description:
              'Valor del filtro, por ejemplo "2024" para year o "Fantasía" para category.',
          },
        },
        required: ['field', 'value'],
      },
      execute: async (input) => {
        const { field, value } = input as { field?: unknown; value?: unknown };
        const f = String(field ?? '');
        const v = String(value ?? '').trim();
        if (!FILTER_FIELDS.includes(f as (typeof FILTER_FIELDS)[number])) {
          return `field tiene que ser uno de: ${FILTER_FIELDS.join(', ')}.`;
        }
        if (!v) return 'Falta el valor del filtro.';
        navigate(`/books/filter/${f}/${encodeURIComponent(v)}`);
        return null;
      },
    },
  ];
}

/**
 * Registra las tools y devuelve la función de limpieza. Si el browser no
 * soporta WebMCP devuelve un noop.
 */
export function registerAgentTools(deps: AgentToolsDeps) {
  const modelContext = getModelContext();
  if (!modelContext) return () => {};

  const controller = new AbortController();

  for (const tool of buildTools(deps)) {
    // Cada registro es independiente: si uno falla, los otros siguen.
    Promise.resolve(
      modelContext.registerTool(tool, { signal: controller.signal }),
    ).catch(() => {});
  }

  return () => controller.abort();
}

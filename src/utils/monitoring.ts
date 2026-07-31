/**
 * Carga Sentry fuera del camino crítico.
 *
 * `@sentry/react` con tracing + replay pesaba ~50 KB en el chunk inicial y su
 * init competía con el primer render (la marca `sentry-tracing-init` caía a los
 * ~1.4 s). Ahora entra en un chunk async cuando el browser está idle.
 *
 * Los errores que ocurren antes de que Sentry esté listo se guardan en un buffer
 * y se reenvían en cuanto termina de inicializar, así no perdemos crashes de
 * arranque, que son justamente los que más importan.
 */
type BufferedError = { error: unknown; extra?: Record<string, unknown> };

const buffer: BufferedError[] = [];
const MAX_BUFFERED = 10;
let started = false;

// El código leía VITE_SENTRY_DNS pero el .env define VITE_SENTRY_DSN, así que
// el init venía corriendo con `dsn: undefined`. Aceptamos las dos para no
// depender de cuál esté cargada en Vercel.
const SENTRY_DSN =
  import.meta.env.VITE_SENTRY_DSN || import.meta.env.VITE_SENTRY_DNS;

function bufferError(error: unknown, extra?: Record<string, unknown>) {
  if (buffer.length < MAX_BUFFERED) buffer.push({ error, extra });
}

function handleWindowError(e: ErrorEvent) {
  bufferError(e.error ?? e.message, { source: 'window.onerror' });
}

function handleRejection(e: PromiseRejectionEvent) {
  bufferError(e.reason, { source: 'unhandledrejection' });
}

async function loadSentry() {
  const Sentry = await import('@sentry/react');

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // 1.0 mandaba una traza por cada navegación; 0.2 alcanza para tener señal
    // sin pagar el overhead en cada sesión.
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  window.removeEventListener('error', handleWindowError);
  window.removeEventListener('unhandledrejection', handleRejection);

  for (const { error, extra } of buffer.splice(0)) {
    Sentry.captureException(error, extra ? { extra } : undefined);
  }
}

export function initMonitoring() {
  if (started || !SENTRY_DSN) return;
  started = true;

  window.addEventListener('error', handleWindowError);
  window.addEventListener('unhandledrejection', handleRejection);

  function start() {
    loadSentry().catch(() => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleRejection);
    });
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(start, { timeout: 4000 });
  } else {
    window.setTimeout(start, 2000);
  }
}

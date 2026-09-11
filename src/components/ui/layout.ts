/**
 * Medidas del layout principal.
 *
 * Viven en un módulo sin componentes a propósito: un archivo que exporta
 * constantes y un componente a la vez rompe el Fast Refresh de Vite, que
 * necesita que cada módulo exporte sólo componentes para poder reemplazarlo
 * en caliente.
 */
export const CONTAINER_MAX_W = { base: '1260px', '2xl': '1560px' };
export const CONTAINER_PX = { base: 5, md: 10, '2xl': 16 };

/**
 * Ancho útil: el `maxW` menos el `px` de los dos lados. Lo usa el header para
 * que su contenido arranque en la misma columna que el de las páginas.
 */
export const CONTENT_MAX_W = { base: '1180px', '2xl': '1432px' };

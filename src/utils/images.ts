const CLOUDINARY_HOST = 'res.cloudinary.com';
const UPLOAD_SEGMENT = '/image/upload/';
const GOOGLE_AVATAR_HOST = 'googleusercontent.com';

// Detecta si el primer segmento después de /upload/ ya es una lista de
// transformaciones (ej. "f_auto,q_auto/") para no encadenar otra.
const HAS_TRANSFORMS = /^[a-z]{1,3}_[^/]+\//;

type ImgOptions = {
  /** Ancho en CSS px del slot donde se muestra la imagen. */
  w?: number;
  /** Alto en CSS px del slot donde se muestra la imagen. */
  h?: number;
  /** Multiplicador para pantallas retina. */
  dpr?: number;
  /** `limit` mantiene el aspect ratio, `fill` recorta al cuadro exacto. */
  crop?: 'limit' | 'fill';
};

/**
 * Reescribe una URL de Cloudinary para que entregue la imagen en el tamaño y
 * formato que realmente necesita el slot donde se renderiza. Sin esto,
 * Cloudinary devuelve el original subido por el usuario (llegamos a servir
 * covers de 2371x3547 y 1.1 MB para mostrarlos a 70x108).
 *
 * Las URLs que no son de Cloudinary y los SVG se devuelven intactos.
 */
export function cldImg(url?: string | null, options: ImgOptions = {}) {
  // Devolvemos undefined (y no '') porque un src vacío hace que algunos
  // browsers pidan la URL de la página actual.
  if (!url) return undefined;
  if (!url.includes(CLOUDINARY_HOST)) return url;
  if (url.endsWith('.svg')) return url;

  const uploadIndex = url.indexOf(UPLOAD_SEGMENT);
  if (uploadIndex === -1) return url;

  const base = url.slice(0, uploadIndex);
  const rest = url.slice(uploadIndex + UPLOAD_SEGMENT.length);
  if (HAS_TRANSFORMS.test(rest)) return url;

  const { w, h, dpr = 2, crop = 'limit' } = options;
  const transforms = ['f_auto', 'q_auto', `c_${crop}`];
  if (w) transforms.push(`w_${w}`);
  if (h) transforms.push(`h_${h}`);
  if (dpr !== 1) transforms.push(`dpr_${dpr}`);

  return `${base}${UPLOAD_SEGMENT}${transforms.join(',')}/${rest}`;
}

/**
 * Igual que `cldImg` pero para avatares: recorta al cuadro y también reescribe
 * el parámetro de tamaño de las fotos de Google (`=s96-c`), que por defecto
 * llegan a 96x96 para mostrarse a 32x32.
 */
export function cldAvatar(url?: string | null, size = 40) {
  // Devolvemos undefined (y no '') porque un src vacío hace que algunos
  // browsers pidan la URL de la página actual.
  if (!url) return undefined;

  if (url.includes(GOOGLE_AVATAR_HOST)) {
    const px = size * 2;
    return /=s\d+(-c)?$/.test(url)
      ? url.replace(/=s\d+(-c)?$/, `=s${px}-c`)
      : `${url}=s${px}-c`;
  }

  return cldImg(url, { w: size, h: size, crop: 'fill' });
}

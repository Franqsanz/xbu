import { GrHome } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';
import { ImEyePlus } from 'react-icons/im';
import { RiAccountCircleLine, RiLoginCircleLine } from 'react-icons/ri';

import { AboutType, LinkType, SelectBooksType } from '../components/types';

const navLink: Array<LinkType> = [
  { name: 'Inicio', href: '/', icon: GrHome },
  { name: 'Explorar', href: 'explore', icon: MdOutlineExplore },
  { name: 'Más vistos', href: 'most-viewed', icon: ImEyePlus },
];

const accountLinks: Array<LinkType> = [
  { name: 'Ingresar', href: 'login', icon: RiLoginCircleLine },
];

const languages: Array<SelectBooksType> = [
  { value: 'Español', label: 'Español' },
  { value: 'Inglés', label: 'Inglés' },
  { value: 'Francés', label: 'Francés' },
  { value: 'Alemán', label: 'Alemán' },
  { value: 'Italiano', label: 'Italiano' },
  { value: 'Portugués', label: 'Portugués' },
  { value: 'Holandés', label: 'Holandés' },
  { value: 'Sueco', label: 'Sueco' },
  { value: 'Noruego', label: 'Noruego' },
  { value: 'Danés', label: 'Danés' },
  { value: 'Finés', label: 'Finés' },
  { value: 'Ruso', label: 'Ruso' },
  { value: 'Polaco', label: 'Polaco' },
  { value: 'Checo', label: 'Checo' },
  { value: 'Húngaro', label: 'Húngaro' },
  { value: 'Griego', label: 'Griego' },
  { value: 'Turco', label: 'Turco' },
  { value: 'Árabe', label: 'Árabe' },
  { value: 'Hebreo', label: 'Hebreo' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Chino (Mandarín)', label: 'Chino (Mandarín)' },
  { value: 'Japonés', label: 'Japonés' },
  { value: 'Coreano', label: 'Coreano' },
  { value: 'Vietnamita', label: 'Vietnamita' },
  { value: 'Tailandés', label: 'Tailandés' },
  { value: 'Malayo', label: 'Malayo' },
  { value: 'Indonesio', label: 'Indonesio' },
  { value: 'Tagalo', label: 'Tagalo' },
  { value: 'Swahili', label: 'Swahili' },
  { value: 'Amárico', label: 'Amárico' },
  { value: 'Bengalí', label: 'Bengalí' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Persa (Farsi)', label: 'Persa (Farsi)' },
  { value: 'Ucraniano', label: 'Ucraniano' },
  { value: 'Rumano', label: 'Rumano' },
  { value: 'Búlgaro', label: 'Búlgaro' },
  { value: 'Serbio', label: 'Serbio' },
  { value: 'Croata', label: 'Croata' },
  { value: 'Esloveno', label: 'Esloveno' },
  { value: 'Eslovaco', label: 'Eslovaco' },
  { value: 'Lituano', label: 'Lituano' },
  { value: 'Letón', label: 'Letón' },
  { value: 'Estonio', label: 'Estonio' },
  { value: 'Islandés', label: 'Islandés' },
];

// Vocabulario de categorías basado en el estándar Thema (nivel 1 + 2, y
// nivel 3 en Ficción y Novela gráfica). Actualizado desde
// https://ns.editeur.org/thema/ — libre y multilingüe.
const categories: Array<SelectBooksType> = [
  // ─── Artes ───────────────────────────────────────────────────────────
  { value: 'Artes: temas generales', label: 'Artes: temas generales' },
  { value: 'Bellas Artes', label: 'Bellas Artes' },
  {
    value: 'Artes: estudios específicos',
    label: 'Artes: estudios específicos',
  },
  { value: 'Fotografía', label: 'Fotografía' },
  {
    value: 'Artes decorativas y aplicadas',
    label: 'Artes decorativas y aplicadas',
  },
  { value: 'Arquitectura', label: 'Arquitectura' },
  { value: 'Cine, TV y radio', label: 'Cine, TV y radio' },
  {
    value: 'Industrias del ocio y del espectáculo',
    label: 'Industrias del ocio y del espectáculo',
  },
  { value: 'Música', label: 'Música' },
  { value: 'Artes escénicas', label: 'Artes escénicas' },
  { value: 'Teatro', label: 'Teatro' },
  { value: 'Danza', label: 'Danza' },
  // ─── Lengua y Lingüística ────────────────────────────────────────────
  {
    value: 'Lengua: consulta y aprendizaje',
    label: 'Lengua: consulta y aprendizaje',
  },
  { value: 'Lingüística', label: 'Lingüística' },
  { value: 'Enseñanza de idiomas', label: 'Enseñanza de idiomas' },
  { value: 'Idiomas', label: 'Idiomas' },
  // ─── Biografía y Literatura ──────────────────────────────────────────
  {
    value: 'Textos clásicos y de la antigüedad',
    label: 'Textos clásicos y de la antigüedad',
  },
  { value: 'Poesía', label: 'Poesía' },
  { value: 'Drama y guiones', label: 'Drama y guiones' },
  { value: 'Biografía', label: 'Biografía' },
  { value: 'Autobiografía', label: 'Autobiografía' },
  { value: 'Memorias', label: 'Memorias' },
  { value: 'Diarios y cartas', label: 'Diarios y cartas' },
  { value: 'Ensayo', label: 'Ensayo' },
  { value: 'Ensayo literario', label: 'Ensayo literario' },
  { value: 'Ensayo filosófico', label: 'Ensayo filosófico' },
  { value: 'Crónica', label: 'Crónica' },
  { value: 'Periodismo narrativo', label: 'Periodismo narrativo' },
  { value: 'Estudios literarios', label: 'Estudios literarios' },
  { value: 'Antologías', label: 'Antologías' },
  { value: 'Literatura de viajes', label: 'Literatura de viajes' },
  // ─── Ficción y géneros ───────────────────────────────────────────────
  {
    value: 'Ficción moderna y contemporánea',
    label: 'Ficción moderna y contemporánea',
  },
  { value: 'Ficción literaria', label: 'Ficción literaria' },
  { value: 'Narrativa clásica', label: 'Narrativa clásica' },
  { value: 'Cuento', label: 'Cuento' },
  { value: 'Cuento corto', label: 'Cuento corto' },
  { value: 'Novela', label: 'Novela' },
  { value: 'Novela corta', label: 'Novela corta' },
  {
    value: 'Fábulas, cuentos populares y leyendas',
    label: 'Fábulas, cuentos populares y leyendas',
  },
  { value: 'Mitología', label: 'Mitología' },
  {
    value: 'Ficción policíaca y misterio',
    label: 'Ficción policíaca y misterio',
  },
  { value: 'Crimen y detectives', label: 'Crimen y detectives' },
  { value: 'Novela negra', label: 'Novela negra' },
  { value: 'Noir / Hardboiled', label: 'Noir / Hardboiled' },
  { value: 'Policial procedimental', label: 'Policial procedimental' },
  { value: 'Cozy mystery', label: 'Cozy mystery' },
  { value: 'Thriller / suspense', label: 'Thriller / suspense' },
  { value: 'Thriller político', label: 'Thriller político' },
  { value: 'Thriller de espionaje', label: 'Thriller de espionaje' },
  { value: 'Thriller psicológico', label: 'Thriller psicológico' },
  { value: 'Thriller médico', label: 'Thriller médico' },
  { value: 'Thriller legal', label: 'Thriller legal' },
  { value: 'Thriller tecnológico', label: 'Thriller tecnológico' },
  { value: 'Aventura', label: 'Aventura' },
  { value: 'Aventura histórica', label: 'Aventura histórica' },
  { value: 'Aventura marítima', label: 'Aventura marítima' },
  { value: 'Acción', label: 'Acción' },
  { value: 'Terror', label: 'Terror' },
  { value: 'Terror clásico', label: 'Terror clásico' },
  { value: 'Terror gótico', label: 'Terror gótico' },
  { value: 'Terror cósmico', label: 'Terror cósmico' },
  { value: 'Fantasmas y sobrenatural', label: 'Fantasmas y sobrenatural' },
  { value: 'Ciencia ficción', label: 'Ciencia ficción' },
  {
    value: 'Ciencia ficción dura (Hard SF)',
    label: 'Ciencia ficción dura (Hard SF)',
  },
  { value: 'Space opera', label: 'Space opera' },
  { value: 'Distopía', label: 'Distopía' },
  { value: 'Utopía', label: 'Utopía' },
  { value: 'Postapocalíptica', label: 'Postapocalíptica' },
  {
    value: 'Ciencia ficción climática (Cli-Fi)',
    label: 'Ciencia ficción climática (Cli-Fi)',
  },
  { value: 'Ciberpunk', label: 'Ciberpunk' },
  { value: 'Steampunk', label: 'Steampunk' },
  { value: 'Solarpunk', label: 'Solarpunk' },
  { value: 'Ficción especulativa', label: 'Ficción especulativa' },
  { value: 'Fantasía', label: 'Fantasía' },
  { value: 'Fantasía épica', label: 'Fantasía épica' },
  { value: 'Fantasía oscura', label: 'Fantasía oscura' },
  { value: 'Fantasía urbana', label: 'Fantasía urbana' },
  { value: 'Fantasía romántica', label: 'Fantasía romántica' },
  { value: 'Grimdark', label: 'Grimdark' },
  { value: 'Sword & Sorcery', label: 'Sword & Sorcery' },
  { value: 'Isekai', label: 'Isekai' },
  { value: 'Realismo mágico', label: 'Realismo mágico' },
  { value: 'Weird Fiction', label: 'Weird Fiction' },
  {
    value: 'Ficción de guerra y militar',
    label: 'Ficción de guerra y militar',
  },
  { value: 'Ficción erótica', label: 'Ficción erótica' },
  { value: 'Escritura confesional', label: 'Escritura confesional' },
  { value: 'Novela romántica', label: 'Novela romántica' },
  { value: 'Romance contemporáneo', label: 'Romance contemporáneo' },
  { value: 'Romance histórico', label: 'Romance histórico' },
  { value: 'Romance paranormal', label: 'Romance paranormal' },
  { value: 'Romance erótico', label: 'Romance erótico' },
  { value: 'Chick lit', label: 'Chick lit' },
  { value: 'Ficción de saga familiar', label: 'Ficción de saga familiar' },
  { value: 'Ficción histórica', label: 'Ficción histórica' },
  { value: 'Ficción histórica antigua', label: 'Ficción histórica antigua' },
  { value: 'Ficción histórica medieval', label: 'Ficción histórica medieval' },
  { value: 'Humor en la ficción', label: 'Humor en la ficción' },
  { value: 'Sátira', label: 'Sátira' },
  {
    value: 'Ficción religiosa y espiritual',
    label: 'Ficción religiosa y espiritual',
  },
  { value: 'Ficción del oeste', label: 'Ficción del oeste' },
  { value: 'Realismo sucio', label: 'Realismo sucio' },
  { value: 'Slice of Life', label: 'Slice of Life' },
  { value: 'Bildungsroman', label: 'Bildungsroman' },
  { value: 'Novela epistolar', label: 'Novela epistolar' },
  { value: 'Ficción experimental', label: 'Ficción experimental' },
  { value: 'Ficción LGBTQ+', label: 'Ficción LGBTQ+' },
  { value: 'Ficción feminista', label: 'Ficción feminista' },
  { value: 'Ficción afrofuturista', label: 'Ficción afrofuturista' },
  // ─── Consulta e Interdisciplinares ───────────────────────────────────
  {
    value: 'Obras de consulta y enciclopédicas',
    label: 'Obras de consulta y enciclopédicas',
  },
  { value: 'Diccionarios', label: 'Diccionarios' },
  {
    value: 'Investigación e información',
    label: 'Investigación e información',
  },
  {
    value: 'Estudios interdisciplinares',
    label: 'Estudios interdisciplinares',
  },
  { value: 'Estudios culturales', label: 'Estudios culturales' },
  { value: 'Estudios de género', label: 'Estudios de género' },
  // ─── Sociedad y Ciencias Sociales ────────────────────────────────────
  {
    value: 'Sociedad y ciencias sociales',
    label: 'Sociedad y ciencias sociales',
  },
  { value: 'Sociología', label: 'Sociología' },
  { value: 'Antropología', label: 'Antropología' },
  { value: 'Etnografía', label: 'Etnografía' },
  { value: 'Psicología', label: 'Psicología' },
  { value: 'Psicoterapia', label: 'Psicoterapia' },
  { value: 'Ciencia política', label: 'Ciencia política' },
  { value: 'Política', label: 'Política' },
  { value: 'Feminismo', label: 'Feminismo' },
  { value: 'Multiculturalismo', label: 'Multiculturalismo' },
  {
    value: 'Estudios sobre paz y conflicto',
    label: 'Estudios sobre paz y conflicto',
  },
  { value: 'Educación y pedagogía', label: 'Educación y pedagogía' },
  { value: 'Trabajo social', label: 'Trabajo social' },
  { value: 'Medios de comunicación', label: 'Medios de comunicación' },
  { value: 'Periodismo', label: 'Periodismo' },
  { value: 'Comunicación', label: 'Comunicación' },
  // ─── Economía, Finanzas y Empresa ────────────────────────────────────
  { value: 'Economía', label: 'Economía' },
  { value: 'Finanzas', label: 'Finanzas' },
  { value: 'Finanzas personales', label: 'Finanzas personales' },
  { value: 'Empresa y gestión', label: 'Empresa y gestión' },
  { value: 'Emprendimiento', label: 'Emprendimiento' },
  { value: 'Liderazgo', label: 'Liderazgo' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Publicidad', label: 'Publicidad' },
  { value: 'Contabilidad', label: 'Contabilidad' },
  { value: 'Recursos humanos', label: 'Recursos humanos' },
  { value: 'Ventas', label: 'Ventas' },
  { value: 'Negocios internacionales', label: 'Negocios internacionales' },
  // ─── Derecho ──────────────────────────────────────────────────────────
  { value: 'Derecho', label: 'Derecho' },
  { value: 'Derecho constitucional', label: 'Derecho constitucional' },
  { value: 'Derecho penal', label: 'Derecho penal' },
  { value: 'Derecho civil', label: 'Derecho civil' },
  { value: 'Derecho internacional', label: 'Derecho internacional' },
  { value: 'Criminología', label: 'Criminología' },
  // ─── Medicina y Salud ────────────────────────────────────────────────
  { value: 'Medicina', label: 'Medicina' },
  { value: 'Enfermería', label: 'Enfermería' },
  { value: 'Psiquiatría', label: 'Psiquiatría' },
  { value: 'Farmacología', label: 'Farmacología' },
  { value: 'Salud pública', label: 'Salud pública' },
  { value: 'Medicina alternativa', label: 'Medicina alternativa' },
  { value: 'Veterinaria', label: 'Veterinaria' },
  // ─── Historia y Arqueología ──────────────────────────────────────────
  { value: 'Historia', label: 'Historia' },
  { value: 'Historia antigua', label: 'Historia antigua' },
  { value: 'Historia medieval', label: 'Historia medieval' },
  { value: 'Historia moderna', label: 'Historia moderna' },
  { value: 'Historia contemporánea', label: 'Historia contemporánea' },
  { value: 'Historia universal', label: 'Historia universal' },
  { value: 'Historia militar', label: 'Historia militar' },
  { value: 'Historia social', label: 'Historia social' },
  { value: 'Historia de las ideas', label: 'Historia de las ideas' },
  { value: 'Arqueología', label: 'Arqueología' },
  { value: 'Prehistoria', label: 'Prehistoria' },
  { value: 'Paleontología', label: 'Paleontología' },
  { value: 'Crimen real', label: 'Crimen real' },
  // ─── Matemáticas y Ciencia ───────────────────────────────────────────
  { value: 'Ciencia: temas generales', label: 'Ciencia: temas generales' },
  { value: 'Divulgación científica', label: 'Divulgación científica' },
  { value: 'Matemáticas', label: 'Matemáticas' },
  { value: 'Estadística', label: 'Estadística' },
  { value: 'Física', label: 'Física' },
  { value: 'Astronomía', label: 'Astronomía' },
  { value: 'Astrofísica y cosmología', label: 'Astrofísica y cosmología' },
  { value: 'Química', label: 'Química' },
  { value: 'Biología', label: 'Biología' },
  { value: 'Genética', label: 'Genética' },
  { value: 'Botánica', label: 'Botánica' },
  { value: 'Zoología', label: 'Zoología' },
  { value: 'Ciencias naturales', label: 'Ciencias naturales' },
  { value: 'Neurociencia', label: 'Neurociencia' },
  // ─── Filosofía y Religión ────────────────────────────────────────────
  { value: 'Filosofía', label: 'Filosofía' },
  { value: 'Ética', label: 'Ética' },
  { value: 'Lógica', label: 'Lógica' },
  { value: 'Historia de la filosofía', label: 'Historia de la filosofía' },
  { value: 'Filosofía occidental', label: 'Filosofía occidental' },
  { value: 'Filosofía oriental', label: 'Filosofía oriental' },
  { value: 'Religión: temas generales', label: 'Religión: temas generales' },
  { value: 'Cristianismo', label: 'Cristianismo' },
  { value: 'Islam', label: 'Islam' },
  { value: 'Judaísmo', label: 'Judaísmo' },
  { value: 'Hinduismo', label: 'Hinduismo' },
  { value: 'Budismo', label: 'Budismo' },
  { value: 'Espiritualidad', label: 'Espiritualidad' },
  { value: 'Meditación', label: 'Meditación' },
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Mitologías comparadas', label: 'Mitologías comparadas' },
  { value: 'Ocultismo y esoterismo', label: 'Ocultismo y esoterismo' },
  // ─── Ciencias de la Tierra y Medio Ambiente ──────────────────────────
  { value: 'Ciencias de la Tierra', label: 'Ciencias de la Tierra' },
  { value: 'Geografía', label: 'Geografía' },
  { value: 'Geología', label: 'Geología' },
  {
    value: 'Meteorología y climatología',
    label: 'Meteorología y climatología',
  },
  { value: 'Cambio climático', label: 'Cambio climático' },
  { value: 'Medio ambiente', label: 'Medio ambiente' },
  { value: 'Ecología', label: 'Ecología' },
  { value: 'Sostenibilidad', label: 'Sostenibilidad' },
  { value: 'Urbanismo y planeación', label: 'Urbanismo y planeación' },
  // ─── Deportes y actividades al aire libre ────────────────────────────
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Ejercicio y fitness', label: 'Ejercicio y fitness' },
  { value: 'Artes marciales', label: 'Artes marciales' },
  { value: 'Actividades al aire libre', label: 'Actividades al aire libre' },
  { value: 'Excursionismo y senderismo', label: 'Excursionismo y senderismo' },
  { value: 'Ciclismo', label: 'Ciclismo' },
  { value: 'Fútbol', label: 'Fútbol' },
  { value: 'Ajedrez', label: 'Ajedrez' },
  // ─── Tecnología, Ingeniería, Agricultura ─────────────────────────────
  {
    value: 'Tecnología: temas generales',
    label: 'Tecnología: temas generales',
  },
  { value: 'Ingeniería', label: 'Ingeniería' },
  { value: 'Ingeniería civil', label: 'Ingeniería civil' },
  { value: 'Ingeniería eléctrica', label: 'Ingeniería eléctrica' },
  { value: 'Ingeniería mecánica', label: 'Ingeniería mecánica' },
  { value: 'Ingeniería aeroespacial', label: 'Ingeniería aeroespacial' },
  { value: 'Electrónica', label: 'Electrónica' },
  { value: 'Robótica', label: 'Robótica' },
  { value: 'Agricultura', label: 'Agricultura' },
  { value: 'Ganadería', label: 'Ganadería' },
  { value: 'Industria alimentaria', label: 'Industria alimentaria' },
  { value: 'Náutica', label: 'Náutica' },
  { value: 'Aviación', label: 'Aviación' },
  { value: 'Automotriz', label: 'Automotriz' },
  // ─── Informática y TI ────────────────────────────────────────────────
  {
    value: 'Informática: temas generales',
    label: 'Informática: temas generales',
  },
  { value: 'Programación', label: 'Programación' },
  { value: 'Desarrollo de software', label: 'Desarrollo de software' },
  { value: 'Ingeniería de software', label: 'Ingeniería de software' },
  { value: 'Ciencia de datos', label: 'Ciencia de datos' },
  { value: 'Inteligencia artificial', label: 'Inteligencia artificial' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Bases de datos', label: 'Bases de datos' },
  { value: 'Redes y comunicaciones', label: 'Redes y comunicaciones' },
  { value: 'Ciberseguridad', label: 'Ciberseguridad' },
  { value: 'Criptografía', label: 'Criptografía' },
  { value: 'Blockchain y criptomonedas', label: 'Blockchain y criptomonedas' },
  { value: 'Diseño web', label: 'Diseño web' },
  { value: 'UX / UI', label: 'UX / UI' },
  { value: 'Diseño gráfico', label: 'Diseño gráfico' },
  // ─── Salud, Relaciones y Desarrollo Personal ─────────────────────────
  { value: 'Salud y bienestar', label: 'Salud y bienestar' },
  { value: 'Nutrición y dietas', label: 'Nutrición y dietas' },
  { value: 'Familia y relaciones', label: 'Familia y relaciones' },
  { value: 'Crianza', label: 'Crianza' },
  { value: 'Cuidado del bebé', label: 'Cuidado del bebé' },
  { value: 'Sexualidad', label: 'Sexualidad' },
  { value: 'Autoayuda', label: 'Autoayuda' },
  { value: 'Desarrollo personal', label: 'Desarrollo personal' },
  { value: 'Productividad', label: 'Productividad' },
  { value: 'Coaching', label: 'Coaching' },
  { value: 'Motivación', label: 'Motivación' },
  { value: 'Duelo y superación', label: 'Duelo y superación' },
  // ─── Estilo de vida, Aficiones y Tiempo libre ────────────────────────
  { value: 'Estilo de vida', label: 'Estilo de vida' },
  { value: 'Cocina', label: 'Cocina' },
  { value: 'Gastronomía', label: 'Gastronomía' },
  { value: 'Repostería', label: 'Repostería' },
  { value: 'Enología y vinos', label: 'Enología y vinos' },
  { value: 'Bebidas', label: 'Bebidas' },
  { value: 'Moda', label: 'Moda' },
  { value: 'Belleza', label: 'Belleza' },
  { value: 'Decoración del hogar', label: 'Decoración del hogar' },
  { value: 'Jardinería', label: 'Jardinería' },
  { value: 'Bricolaje (DIY)', label: 'Bricolaje (DIY)' },
  { value: 'Manualidades y artesanía', label: 'Manualidades y artesanía' },
  { value: 'Coleccionismo', label: 'Coleccionismo' },
  { value: 'Filatelia', label: 'Filatelia' },
  { value: 'Numismática', label: 'Numismática' },
  { value: 'Fotografía como hobby', label: 'Fotografía como hobby' },
  { value: 'Juegos y pasatiempos', label: 'Juegos y pasatiempos' },
  { value: 'Juegos de mesa', label: 'Juegos de mesa' },
  { value: 'Videojuegos', label: 'Videojuegos' },
  { value: 'Mascotas', label: 'Mascotas' },
  { value: 'Turismo y viajes', label: 'Turismo y viajes' },
  { value: 'Guías de viaje', label: 'Guías de viaje' },
  { value: 'Humor', label: 'Humor' },
  // ─── Novela gráfica, Cómic, Manga ────────────────────────────────────
  { value: 'Novela gráfica', label: 'Novela gráfica' },
  { value: 'Cómic', label: 'Cómic' },
  { value: 'Cómic de superhéroes', label: 'Cómic de superhéroes' },
  { value: 'Cómic independiente', label: 'Cómic independiente' },
  { value: 'Cómic de aventuras', label: 'Cómic de aventuras' },
  { value: 'Cómic de humor', label: 'Cómic de humor' },
  { value: 'Manga', label: 'Manga' },
  { value: 'Manga Shōnen', label: 'Manga Shōnen' },
  { value: 'Manga Shōjo', label: 'Manga Shōjo' },
  { value: 'Manga Seinen', label: 'Manga Seinen' },
  { value: 'Manga Josei', label: 'Manga Josei' },
  { value: 'Webcómic', label: 'Webcómic' },
  { value: 'Fanzine', label: 'Fanzine' },
  // ─── Infantil, Juvenil y Didáctico ───────────────────────────────────
  { value: 'Literatura infantil', label: 'Literatura infantil' },
  { value: 'Álbum ilustrado', label: 'Álbum ilustrado' },
  { value: 'Primeros lectores', label: 'Primeros lectores' },
  {
    value: 'Literatura juvenil (Middle Grade)',
    label: 'Literatura juvenil (Middle Grade)',
  },
  { value: 'Young Adult', label: 'Young Adult' },
  { value: 'New Adult', label: 'New Adult' },
  { value: 'Material didáctico', label: 'Material didáctico' },
  { value: 'Libros de texto', label: 'Libros de texto' },
  // ─── Corrientes y regiones literarias ────────────────────────────────
  { value: 'Literatura latinoamericana', label: 'Literatura latinoamericana' },
  { value: 'Boom latinoamericano', label: 'Boom latinoamericano' },
  { value: 'Literatura española', label: 'Literatura española' },
  { value: 'Literatura norteamericana', label: 'Literatura norteamericana' },
  { value: 'Literatura europea', label: 'Literatura europea' },
  { value: 'Literatura rusa', label: 'Literatura rusa' },
  { value: 'Literatura asiática', label: 'Literatura asiática' },
  { value: 'Literatura africana', label: 'Literatura africana' },
  { value: 'Beat Generation', label: 'Beat Generation' },
  { value: 'Literatura universal', label: 'Literatura universal' },
];

const formats: Array<SelectBooksType> = [
  { value: 'Físico', label: 'Físico' },
  { value: 'Electrónico', label: 'Electrónico' },
  { value: 'AudioLibro', label: 'AudioLibro' },
];

const aboutCategories: Array<AboutType> = [
  {
    category: 'Acción',
    description:
      'En literatura, cine o comic, acción hace referencia al conjunto de sucesos o actos que, encadenados uno tras otro, conforman el argumento de una obra.',
  },
  {
    category: 'Adulto',
    description:
      'Los libros para adultos suelen centrarse en las experiencias de vida adulta, como el trabajo, las relaciones románticas, la familia, las responsabilidades y otros aspectos de la vida que son más relevantes para adultos.',
  },
  {
    category: 'Arquitectura',
    description:
      'La arquitectura (del latín architectūra, architectūrae, y este a su vez del griego antiguo ἀρχιτέκτων, architéctōn, ‘arquitecto’ o ‘constructor jefe’, compuesto de ἀρχός, archós ‘jefe’, ‘guía’, y τέκτων, téctōn, ‘constructor’) es el arte y la técnica de proyectar, diseñar y construir, modificando el hábitat humano, estudiando la estética, el buen uso y la función de los espacios, ya sean arquitectónicos, urbanos o de paisaje.',
  },
  {
    category: 'Aventura',
    description:
      'La novela de aventuras es un género narrativo literario que narra los viajes, el misterio y el riesgo donde un personaje principal se enfrenta a un desafío a lo largo del viaje.',
  },
  {
    category: 'Bebidas',
    description:
      'Es una exploración completa del fascinante mundo de las bebidas. Desde cócteles creativos hasta las complejidades de los vinos y la rica historia del café, abarca todas las facetas de las bebidas que han deleitado a la humanidad a lo largo de los siglos',
  },
  {
    category: 'Ciencia',
    description:
      'La ciencia (del latín scientĭa, "conocimiento") es un conjunto de conocimientos sistemáticos comprobables que estudian, explican y predicen los fenómenos sociales, artificiales y naturales. El conocimiento científico se obtiene de manera metodológica mediante observación y experimentación en campos de estudio específicos. Dicho conocimiento se organiza y se clasifica sobre la base de principios explicativos, ya sean de forma teórica o práctica. A partir del razonamiento lógico y el análisis objetivo de la evidencia científica se formulan preguntas de investigación e hipótesis, se deducen principios y leyes, y se construyen modelos, teorías y sistemas de conocimientos por medio del método científico.',
  },
  {
    category: 'Crimen',
    description:
      'Los libros de crimen no solo ofrecen emoción y suspense, sino que también exploran temas más profundos como la moralidad, la justicia y la naturaleza humana. Desde los clásicos del género hasta las nuevas voces que reinventan las convenciones, este género literario te invita a resolver enigmas, enfrentarte al lado oscuro de la sociedad y experimentar la adrenalina de la caza de criminales.',
  },
  {
    category: 'Cómics',
    description:
      'Género literario narrativo que, con precedente en la Antigüedad grecolatina, se desarrolla a partir de la Edad Moderna.',
  },
  {
    category: 'Ciencia Ficción',
    description:
      'Es la denominación de uno de los géneros derivados de la literatura de ficción, junto con la literatura fantástica y la narrativa de terror. Algunos autores estiman que el término es una mala traducción del inglés science fiction y que la correcta es ficción científica. Nacida como género en la década de 1920 (aunque hay obras reconocibles muy anteriores) y exportada posteriormente a otros medios, como el cinematográfico, historietístico y televisivo, tiene un gran auge desde la segunda mitad del siglo xx debido al interés popular acerca del futuro que despertó el espectacular avance tanto científico como tecnológico alcanzado durante todos estos años.',
  },
  {
    category: 'Ciencias Naturales',
    description:
      'Las ciencias naturales, ciencias de la naturaleza, ciencias físico-naturales o ciencias experimentales (históricamente denominadas filosofía natural o historia natural) son aquellas ciencias que tienen por objeto el estudio de la naturaleza, siguiendo la modalidad del método científico conocida como método empírico-analítico.',
  },
  {
    category: 'Clásicos',
    description:
      'La literatura clásica hoy en día se considera aquella escrita en griego antiguo o en latín y que forma parte del canon occidental. No debe confundirse con los clásicos nacionales, aquellas obras consideradas modélicas para cada país, ni con aquellos libros que sobreviven al paso del tiempo o que se escribieron en el periodo del Neoclasicismo. El concepto engloba, por tanto la literatura griega y la literatura latina, excluyendo las obras de la Grecia moderna.',
  },
  {
    category: 'Drama',
    description:
      'Suele llamarse drama a aquella obra que incluye temáticas, pasajes o elementos serios o graves, especialmente cuando tiene un "final trágico".',
  },
  {
    category: 'Desarrollo De Software',
    description:
      'Estos libros proporcionan conocimientos fundamentales y avanzados para desarrolladores de software y profesionales en tecnología. Exploran desde los principios básicos de la programación hasta enfoques más avanzados en arquitectura de software, metodologías de desarrollo, y temas especializados como seguridad informática, inteligencia artificial y desarrollo web.',
  },
  {
    category: 'Distópico',
    description:
      'Es una representación ficticia de un mundo futuro desalentador e indeseable para la humanidad, en el que es frecuente que nos encontremos a personajes valientes atrapados en sociedades oprimidas donde la mayoría de las personas viven en la clandestinidad sin ser en muchos casos conscientes de ello.',
  },
  {
    category: 'Economía',
    description:
      'La literatura económica se refiere al cuerpo de obras escritas que abordan temas relacionados con la teoría, la práctica y el análisis de la economía.Esta disciplina abarca una amplia gama de temas, desde la teoría macroeconómica y microeconómica hasta cuestiones específicas como el comercio internacional, las finanzas, el desarrollo económico y la economía del comportamiento.',
  },
  {
    category: 'Ficción',
    description:
      'Se denomina ficción a la simulación de la realidad que realizan las obras como literarias, cinematográficas, historietíscas, de animación o de otro tipo, cuando presentan un mundo imaginario al receptor. Estos mundos tienen sus propios personajes y reglas de verosimilitud, con un grado variable de realismo, sea porque toman algunos elementos de referencia de la realidad, sea porque la contradicen o transforman.',
  },
  {
    category: 'Fantasía',
    description:
      'Se conoce como literatura fantástica a cualquier relato en que participan fenómenos sobrenaturales y extraordinarios, como la magia o la intervención de criaturas inexistentes. Esta definición resulta ineficaz, debido a que los elementos sobrenaturales están presentes en todos los relatos mitológicos y religiosos y su presencia tiene un carácter muy distinto del que posee en la civilización actual.',
  },
  {
    category: 'Filosofía',
    description:
      'Esta forma particular de literatura busca no solo presentar argumentos lógicos y razonamientos críticos, sino también invitar a la reflexión profunda sobre la naturaleza de la realidad y la existencia. A lo largo de las épocas, la literatura filosófica ha adoptado diversas formas y estilos, desde los diálogos socráticos de Platón hasta las reflexiones densas y abstractas de Immanuel Kant o Friedrich Nietzsche.',
  },
  {
    category: 'Historia',
    description:
      'Son obras que exploran y explican los acontecimientos pasados, proporcionando a los lectores una comprensión más profunda de la evolución de la humanidad. Desde civilizaciones antiguas hasta eventos contemporáneos, estos libros ofrecen narrativas detalladas respaldadas por una investigación rigurosa.',
  },
  {
    category: 'Histórico',
    description:
      'Aquella que, siendo una obra de ficción, recrea un periodo histórico preferentemente lejano y en la que forman parte de la acción personajes y eventos no ficticios.',
  },
  {
    category: 'Horror',
    description:
      'La literatura de terror, muchas veces llamada literatura de horror o gótica, se caracteriza por ser un género popular que busca provocar en los lectores efectos relacionados con el miedo o, como su nombre lo indica, el terror, en grados diversos.',
  },
  {
    category: 'Literatura',
    description:
      '“Literatura” proviene del latín, y originalmente significaba “el uso de letras” o “escritura.” Pero cuando la palabra entró las lenguas romances derivadas del latín, obtuvo el significado adicional de “conocimiento obtenido al leer o estudiar libros.”',
  },
  {
    category: 'Misterio',
    description:
      'El término novela de misterio a menudo es utilizado como sinónimo de novela de detective o novela de crimen, es decir, una novela o cuento en la cual un detective (profesional o aficionado) investiga y resuelve un misterio criminal. A veces los libros de misterio tratan sobre crímenes que realmente acontecieron.',
  },
  {
    category: 'Novela',
    description:
      'La novela (del italiano novella) es una obra literaria en la que se narra una acción fingida en todo o en parte y cuyo fin es causar placer estético a los lectores con la descripción, pintura de sucesos o lances interesantes así como de personajes, pasiones y costumbres.',
  },
  {
    category: 'Novela Histórica',
    description:
      'La novela histórica es un subgénero narrativo que se configuró en el Romanticismo del siglo xix y que ha continuado desarrollándose con bastante éxito en los siglos xx y xxi. Utilizando un argumento de ficción, como cualquier novela, tiene la característica de que este se sitúa en un momento histórico concreto y los acontecimientos históricos reales suelen tener cierta relevancia en el desarrollo del argumento.',
  },
  {
    category: 'Novela Romantica',
    description:
      'Una novela romántica es una obra en prosa que narra una historia centrada en el amor y que tiene un final emocionalmente satisfactorio y optimista.',
  },
  {
    category: 'Novela Policiaca',
    description:
      'La novela policiaca se caracteriza por contar historias sobre crímenes y delitos, protagonizados generalmente por el detective o el policía encargado de resolverlos.',
  },
  {
    category: 'No Ficción',
    description:
      'La no ficción es un género literario caracterizado por el empleo de la exposición, descripción, narración o argumentación de un contenido verídico o basado en hechos reales. Trata de ser fiel a la realidad con el objetivo de divulgar, informar o educar sobre un tema concreto.',
  },
  {
    category: 'Política',
    description:
      'La literatura política no se limita a un enfoque ideológico único; más bien, refleja una amplia gama de perspectivas, desde las visiones liberales y conservadoras hasta las teorías socialistas, feministas, anarquistas y muchas otras.',
  },
  {
    category: 'Prehistoria',
    description:
      'La literatura sobre la prehistoria aborda temas que van desde la evolución humana y la aparición de las primeras herramientas hasta el surgimiento de las civilizaciones y las sociedades complejas. Los escritos en este campo pueden abarcar desde enfoques académicos especializados hasta divulgación accesible para el público general.',
  },
  {
    category: 'Poesía',
    description:
      'La poesía es un género literario considerado como una manifestación de la belleza o del sentimiento estético por medio de la palabra, en verso o en prosa.​',
  },
  {
    category: 'Postapocalíptica',
    description:
      'Aunque el término «post-apocalíptico» es relativamente moderno, la idea de historias ambientadas después de una gran catástrofe tiene raíces antiguas. Pueden encontrarse ejemplos en textos religiosos y mitológicos, como el Génesis bíblico o el mito del diluvio universal.',
  },
  {
    category: 'Psicológica',
    description:
      'La novela psicológica o novela de análisis psicológico, también conocida como realismo psicológico es una obra de ficción en prosa que enfatiza la caracterización interior de sus personajes, sus motivos, circunstancias y acciones internas que nacen y se desarrollan a partir de las acciones externas. La novela psicológica "pospone la narración a la descripción de los estados de ánimo, pasiones y conflictos psicológicos".',
  },
  {
    category: 'Romance',
    description:
      'El romance es un tipo de poema característico de la tradición literaria española, ibérica e hispanoamericana compuesto usando la combinación métrica homónima.',
  },
  {
    category: 'Thriller',
    description:
      'La principal característica de este género es tener una trama que haga que el espectador esté en constante suspenso, que le genere la necesidad de finalizar la historia y que mantenga la ansiedad, la emoción y la incertidumbre hasta la resolución del tema.',
  },
];

export { navLink, accountLinks, languages, categories, aboutCategories, formats };

import { GrHome } from 'react-icons/gr';
import { MdOutlineExplore, MdOutlineFavoriteBorder } from 'react-icons/md';
import { ImEyePlus } from 'react-icons/im';
import { RiAccountCircleLine, RiLoginCircleLine } from 'react-icons/ri';

import { AboutType, LinkType, SelectBooksType } from '../components/types';

const navLink: Array<LinkType> = [
  { name: 'Inicio', href: '/', icon: GrHome },
  { name: 'Explorar', href: 'explore', icon: MdOutlineExplore },
  { name: 'Más vistos', href: 'most-viewed', icon: ImEyePlus },
  {
    name: 'Mis favoritos',
    href: 'my-favorites',
    icon: MdOutlineFavoriteBorder,
  },
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

const categories: Array<SelectBooksType> = [
  { value: 'Acción', label: 'Acción' },
  { value: 'Autoayuda', label: 'Autoayuda' },
  { value: 'Aventura', label: 'Aventura' },
  { value: 'Arqueología', label: 'Arqueología' },
  { value: 'Arquitectura', label: 'Arquitectura' },
  { value: 'Artes Plásticas', label: 'Artes Plásticas' },
  { value: 'Automotriz', label: 'Automotriz' },
  { value: 'Aventuras gráficas', label: 'Aventuras gráficas' },
  { value: 'Belleza', label: 'Belleza' },
  { value: 'Biología', label: 'Biología' },
  { value: 'Botánica', label: 'Botánica' },
  { value: 'Biografía', label: 'Biografía' },
  { value: 'Ciencia Ficción', label: 'Ciencia Ficción' },
  { value: 'Crimen', label: 'Crimen' },
  { value: 'Contemporáneo', label: 'Contemporáneo' },
  { value: 'Clásicos', label: 'Clásicos' },
  { value: 'Cuidado Del Bebé', label: 'Cuidado Del Bebé' },
  { value: 'Comedia', label: 'Comedia' },
  { value: 'Ciencias Naturales', label: 'Ciencias Naturales' },
  { value: 'Cine', label: 'Cine' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Terror', label: 'Terror' },
  { value: 'Suspenso', label: 'Suspenso' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Economía', label: 'Economía' },
  { value: 'Exploración', label: 'Exploración' },
  { value: 'Epopeya', label: 'Epopeya' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Religión', label: 'Religión' },
  { value: 'Reparación De Bicicletas', label: 'Reparación De Bicicletas' },
  { value: 'Fantasía', label: 'Fantasía' },
  { value: 'Fábula', label: 'Fábula' },
  { value: 'Filosofía', label: 'Filosofía' },
  { value: 'Poesía', label: 'Poesía' },
  { value: 'Psicoterapia', label: 'Psicoterapia' },
  { value: 'Psicología', label: 'Psicología' },
  { value: 'Productividad', label: 'Productividad' },
  { value: 'Liderazgo', label: 'Liderazgo' },
  { value: 'Negocio', label: 'Negocio' },
  { value: 'Medicina', label: 'Medicina' },
  { value: 'Policiales', label: 'Policiales' },
  { value: 'Ciencia', label: 'Ciencia' },
  { value: 'Programación', label: 'Programación' },
  { value: 'Informática', label: 'Informática' },
  { value: 'Desarrollo De Software', label: 'Desarrollo De Software' },
  { value: 'Desarrollo Personal', label: 'Desarrollo Personal' },
  { value: 'Tecnología', label: 'Tecnología' },
  { value: 'Fabricación De Joyas', label: 'Fabricación De Joyas' },
  { value: 'Finanzas', label: 'Finanzas' },
  { value: 'Física', label: 'Física' },
  { value: 'Ingenierías', label: 'Ingenierías' },
  { value: 'Jardinería', label: 'Jardinería' },
  { value: 'Cómics', label: 'Cómics' },
  { value: 'Cocina', label: 'Cocina' },
  { value: 'Bebidas', label: 'Bebidas' },
  { value: 'Literatura', label: 'Literatura' },
  { value: 'Literatura Infantil', label: 'Literatura Infantil' },
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Novela Histórica', label: 'Novela Histórica' },
  { value: 'Novela', label: 'Novela' },
  { value: 'Novela Negra', label: 'Novela Negra' },
  { value: 'Novela Gráfica', label: 'Novela Gráfica' },
  { value: 'Novela Terror', label: 'Novela Terror' },
  { value: 'Música', label: 'Música' },
  { value: 'Historia', label: 'Historia' },
  { value: 'Memoria', label: 'Memoria' },
  { value: 'Misterio', label: 'Misterio' },
  { value: 'Misterio De Asesinato', label: 'Misterio De Asesinato' },
  { value: 'Adulto', label: 'Adulto' },
  { value: 'Ficción', label: 'Ficción' },
  { value: 'Ficción Realista', label: 'Ficción Realista' },
  { value: 'No Ficción', label: 'No Ficción' },
  { value: 'Prehistoria', label: 'Prehistoria' },
  { value: 'Política', label: 'Política' },
  { value: 'Enciclopedias', label: 'Enciclopedias' },
  { value: 'Ficción Histórica', label: 'Ficción Histórica' },
  { value: 'Histórico', label: 'Histórico' },
  { value: 'Humor', label: 'Humor' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Historia Antigua', label: 'Historia Antigua' },
  { value: 'Historia Universal', label: 'Historia Universal' },
  { value: 'Viajar', label: 'Viajar' },
  { value: 'Novela Romantica', label: 'Novela Romantica' },
  { value: 'Novela Policiaca', label: 'Novela Policiaca' },
  { value: 'Cuento', label: 'Cuento' },
  { value: 'Cuento Corto', label: 'Cuento Corto' },
  { value: 'Cuento Fantástico', label: 'Cuento Fantástico' },
  { value: 'Ensayo', label: 'Ensayo' },
  { value: 'Autobiografía', label: 'Autobiografía' },
  { value: 'Cyberpunk', label: 'Cyberpunk' },
  { value: 'Postapocalíptica', label: 'Postapocalíptica' },
  { value: 'Espacial', label: 'Espacial' },
  { value: 'Espionaje', label: 'Espionaje' },
  { value: 'Psicológica', label: 'Psicológica' },
  { value: 'Pedagogía', label: 'Pedagogía' },
  { value: 'Guerra', label: 'Guerra' },
  { value: 'LGBTQ+', label: 'LGBTQ+' },
  { value: 'Sátira', label: 'Sátira' },
  { value: 'Humor Grafico', label: 'Humor Grafico' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Thriller de Detectives', label: 'Thriller de Detectives' },
  { value: 'Thriller de Espías', label: 'Thriller de Espías' },
  { value: 'Utópico', label: 'Utópico' },
  { value: 'Distópico', label: 'Distópico' },
  { value: 'Romance paranormal', label: 'Romance paranormal' },
  { value: 'Paranormal', label: 'Paranormal' },
  { value: 'Familia', label: 'Familia' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Audiolibro', label: 'Audiolibro' },
  { value: 'Ficción para adultos', label: 'Ficción para adultos' },
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

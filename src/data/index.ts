export type Book = {
  key: string;
  title: string;
  path: string;
  summary: string;
  additionalInformation: string;
  images: Array<BookImage>;
  price?: string;
  numberOfPages: string;
  isbn: string;
  cover: BookImage;
  datePublished: string;
  tags: Array<string>;
};

export type BookImage = { source: string; alt: string };

export const Book1992: Book = {
  key: "l-histoire-de-neschers",
  title: "L'Histoire de Neschers de l'an 1830 à nos jours",
  path: "/assets/L-Histoire-de-Neschers.pdf",
  summary:
    "J'ai essayé dans cette monographie, de faire resurgir les racines d'un passé, images lointaines et fugaces, mais pourtant si proches de nous sur l'humaine condition. De souffrance en joie, de désespoir en espérance, de recul en progrès, l'homme traversa avec courage les épreuves du temps. Cette monographie n'aurait pu voir le jour sans la consultation évidente de plusieurs centaines de pages de délibérations des différents conseils municipaux du village de Neschers qui se sont succédés depuis plus de 150 ans, d'archives privées, ainsi que d'actes notariés.",
  additionalInformation:
    "<em>Je ne saurais trop vous recommander le site « Fontaines de France » impressionnant panorama sur la richesse artistique, sculptures sortant des mains d'habiles artistes régionaux ou nationaux, fontaines aux multiples aspects, monuments présentant une très grande variété de formes et de styles, des plus complexes au plus épurés, alliant à la fois beauté et simplicité. Tailler, ciseler, façonner, tels furent les maîtres mots de nos virtuoses du temps jadis, mais aussi de nos contemporains, où fontaines et « l'eau symbole de vie » sont intimement liés dans une unique et profonde harmonie. Actuellement 2868 fontaines sont recensées dans 1617 villes.</em>",
  images: [
    {
      source: `/img/Presse_92_Page_1.jpg`,
      alt: "Articles de presse publiés en 1998 sur L'Histoire de Neschers de l'an 1830 à nos jours.",
    },
    {
      source: `/img/Presse_92_Page_2.jpg`,
      alt: "Articles de presse publiés en 1998 sur L'Histoire de Neschers de l'an 1830 à nos jours.",
    },
    {
      source: `/img/Presse_92_Page_3.jpg`,
      alt: "Articles de presse publiés en 1998 sur L'Histoire de Neschers de l'an 1830 à nos jours.",
    },
  ],
  numberOfPages: "230",
  isbn: "12",
  cover: {
    source: `/img/livre1.jpg`,
    alt: "L'Histoire de Neschers de l'an 1830 à nos jours",
  },
  datePublished: "19",
  tags: ["Histoire", "Neschers", "L'Histoire de Neschers"],
};

export const Book1998: Book = {
  key: "jean-baptiste-croizet",
  title: "Jean-Baptiste Croizet, curé de Neschers et paléontologue",
  path: "/assets/Jean-Baptiste-Croizet.pdf",
  summary:
    "J'ai surtout voulu dans cette biographie mettre l'accent sur le savant, le conférencier, l'écrivain et le voyageur qu'il fut tout au long de sa vie. <br/> Travailleur infatigable, il passa une partie importante de son temps dans la recherche sur les diverses fossiles (ossements, poissons, plantes, fleurs), mais n'en oublia pas pour autant, la géologie, l'étude des monuments anciens, les conférences, etc...<br/>Il eut pour amis de nombreux savants tels que : le baron Cuvier, Geoffroy Saint Hilaire, le comte de Rési, mais aussi bien d'autres prestigieux personnages, parmi ses relations figurèrent des ministres et l'on compta même des proches des différentes familles royales qui se succédèrent. Homme d'une grande modestie, comme il le fut d'ailleurs tout au long de son existence, il mena une vie exemplaire en se tenant loin des honneurs.<br/>Le livre compte environ 320 pages abondamment illustrées, agrémentées à la fin de chaque chapitre d'un glossaire, suivi de nombreuses reproductions de cartes anciennes, de planches, de dessins et de graphiques.",
  additionalInformation:
    "<em>Cette biographie est référencée dans une publication anglaise d'antiquité de Mars 2012, dont le titre est :\"Lost and Found : the remarkable curatorial history one of the earliest discoveries of paleolithic portable art\" pages 237-244. Les auteurs sont : S-M. Bello, G. Delbarre, S.A. Parglitt, A.P. Curraant, R.Krusznski et C.B. Stringer.<br /> La découverte faîte par Jean-Baptiste Croizet à Neschers, d'un bois de renne gravé représentant partiellement un cheval ; il le revendit, ainsi qu'une partie de sa collection, qui fut estimée par George Robert Watherhouse, l'un des conservateurs du British Museum de Londres. Celui-ci se rendit à Neschers en janvier 1848, il en offrit 440 livres sterling (l'équivalent aujourd'hui d'environ 25500 livres sterling). Aux personnes intéressées, je ne saurais trop vous recommandez la lecture de cet article en cliquant <a href='http://www.academia.edu/8897696/Lost_and_found_the_remarkable_curatorial_history_of_one_of_the_earliest_discoveries_of_Palaeolithic_portable_art' target='_blank'>ici</a>.</em>",
  images: [
    {
      source: `/img/Presse_98_Page_1.jpg`,
      alt: "Articles de presse publiés en 1998 sur Jean-Baptiste Croizet, curé de Neschers et paléontologue.",
    },
    {
      source: `/img/Presse_98_Page_2.jpg`,
      alt: "Articles de presse publiés en 1998 sur Jean-Baptiste Croizet, curé de Neschers et paléontologue.",
    },
    {
      source: `/img/Presse_98_Page_3.jpg`,
      alt: "Articles de presse publiés en 1998 sur Jean-Baptiste Croizet, curé de Neschers et paléontologue.",
    },
    {
      source: `/img/Presse_98_Page_4.jpg`,
      alt: "Articles de presse publiés en 1998 sur Jean-Baptiste Croizet, curé de Neschers et paléontologue.",
    },
  ],
  numberOfPages: "230",
  isbn: "12",
  cover: {
    source: `/img/livre2.jpg`,
    alt: "Jean-Baptiste Croizet, curé de Neschers et paléontologue",
  },
  datePublished: "12-12",
  tags: ["sciences", "histoire", "paleontologie", "paléontologie"],
};

export const Book2017: Book = {
  key: "notes-plauzat-villages-voisins",
  title:
    "Quelques notes prises au fil du temps sur Plauzat et ses villages voisins",
  path: "/assets/Notes-sur-Plauzat.pdf",
  summary:
    "Quand j'ai commencé la rédaction de cet ouvrage je me suis souvenu d'une remarque pleine de bon sens venant de la part d'un ami qui me citait très souvent cette pensée dont il était l'auteur « comment apprécier son présent et construire son avenir si l'on ignore son passé » . De cette réflexion pertinente cette dernière me guida dans le choix, la recherche et la réalisation de mes précédents livres.<br/>Pour ce troisième bouquin, je me suis inspiré des délibérations du conseil municipal de Plauzat de 1838 à 1920, d'archives privées des XVIIème, XVIIIème et début du XIXème siècles sur Plauzat et ses bourgs environnants, ainsi que de très anciennes brochures. J'ai tenu à ne pas oublier le travail réalisé par l'ensemble des élus locaux tout au long de ces deux siècles passés, tout en ayant aussi une pensée toute particulière pour la totalité de nos concitoyens qui au fil des siècles réussirent à devenir autant que possible, les acteurs de leur propre destinée.<br />En conclusion, c'est un clin d'œil sur le temps qui passe, un regard sur la période écoulée, mais aussi un voyage vers un futur qui j'ose l'espérer, même si souvent hélas ! des événements graves ont lieu sur n'importe quelle partie de notre planète, et nous prennent très souvent de cours en menaçant parfois la paix mondiale, mais en dépit de tout cela il faut savoir encore garder l'espoir en l'Etre Humain.",
  additionalInformation:
    "<em>Le livre est disponible à l'achat sur Amazon en cliquant <a href='https://www.amazon.fr/dp/B07B8KLS8M' target='_blank'>ici</a></em>",
  images: [
    {
      source: `/img/Presse_17_Page_1.jpg`,
      alt: "Article de presse sortie en 1998 sur Quelques notes prises au fil du temps sur Plauzat et ses villages voisins.",
    },
  ],
  price: "20.00",
  numberOfPages: "230",
  isbn: "12",
  cover: {
    source: `/img/livre3.jpg`,
    alt: "Quelques notes prises au fil du temps sur Plauzat et ses villages voisins",
  },
  datePublished: "12-12",
  tags: ["plauzat"],
};

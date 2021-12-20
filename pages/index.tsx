import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Book } from "../src/components/book";

const generateImageGallery = (length = 13) => {
  const images = [];
  for (let i = 1; i <= length; i++) {
    images.push({
      original: `/img/image${i}.jpg`,
      thumbnail: `/img/image${i}.jpg`,
      originalAlt: "Michel Golfier - Écrivain auvergnat",
      thumbnailAlt: "Michel Golfier - Écrivain auvergnat",
    });
  }
  return images;
};

const Page: NextPage = () => {
  return (
    <Box>
      <Text fontFamily="Oooh Baby" fontWeight="600" fontSize="4xl">
        Michel Golfier
      </Text>
      <Book
        title={"Lorsque l'écriture et la vision s'allient"}
        summary="Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire."
      />
      <Book
        title={"L'Histoire de Neschers de l'an 1830 à nos jours."}
        summary="Dans mon premier livre, je décris la vie des villageois et du monde rural de mon village sur 150 ans à travers certains événements politiques ou agricoles qui marquèrent la France à différentes époques et qui eurent des répercussions dans les villages de l'hexagone. Neschers a eu un passé préhistorique et historique important, comme dans beaucoup de bourgs de notre région d'ailleurs. Furent trouvées notamment des monnaies celtiques, des poteries, des traces de construction Gallo-Romaine, mais aussi une sculpture en arkose « le cavalier à l'anguipède »."
      />
      <Book
        title={"Jean-Baptiste Croizet, curé de Neschers et paléontologue."}
        summary="Dans un second, je retrace l'existence et l'oeuvre d'un éminent et remarquable savant paléontologiste du XIXème siècle qui de surcroit été curé de Neschers, tout au long de sa destinée il fit de nombreuses découvertes d'ossements fossilisés, mais aussi un bois de renne sculpté où été représenté un cheval, Il donna de nombreuses conférences en France et en Europe, et fut membres de plusieurs instituts."
      />
      <Book
        title={
          "Quelques notes prises au fil du temps sur Plauzat et ses villages voisins."
        }
        summary="Dans le troisième, j'évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920…etc. la vie des hommes faite de labeur dans cette France paysanne sous la royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce surtout aux progrès et avancées réalisés dans divers domaines tels que, l'hygiène et la médecine qui contribuèrent grandement à faire reculer l'âge de la mort, l'éducation fut un facteur important pour la prise de conscience d'un grand nombre d'entre eux pour la liberté et la démocratie, sans oublier bien évidemment l'apport des sciences et de nouvelles techniques qui facilitèrent grandement la vie quotidienne de nos concitoyens. Mais hélas ! ils n'allaient pas échapper à divers conflits."
      />
    </Box>
  );
};

export default Page;

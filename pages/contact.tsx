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
      <Book
        title={"Lorsque l'écriture et la vision s'allient"}
        href="d"
        summary="Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire."
      />
    </Box>
  );
};

export default Page;

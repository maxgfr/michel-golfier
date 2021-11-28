import type { NextPage } from "next";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { NextSeo } from "next-seo";

type Presse = { year: number; length: number; alt: string };

const Presse1998: Presse = {
  year: 98,
  length: 4,
  alt: "Articles de presse publiés en 1998 sur Jean-Baptiste Croizet, curé de Neschers et paléontologue.",
};

const Presse1992: Presse = {
  year: 92,
  length: 3,
  alt: "Articles de presse publiés en 1998 sur L’Histoire de Neschers de l'an 1830 à nos jours.",
};

const Presse2017: Presse = {
  year: 17,
  length: 1,
  alt: "Article de presse sortie en 1998 sur Quelques notes prises au fil du temps sur Plauzat et ses villages voisins.",
};

const generateImageGallery = (presse: Presse) => {
  const images = [];
  for (let i = 1; i <= presse.length; i++) {
    images.push({
      original: `/img/Presse_${presse.year}_Page_${i}.jpg`,
      thumbnail: `/img/Presse_${presse.year}_Page_${i}.jpg`,
      originalAlt: presse.alt,
      thumbnailAlt: presse.alt,
    });
  }
  return images;
};

const Page: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          site_name: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div>
        <ImageGallery
          items={generateImageGallery(Presse1992)}
          useBrowserFullscreen={true}
        />
      </div>
    </>
  );
};

export default Page;

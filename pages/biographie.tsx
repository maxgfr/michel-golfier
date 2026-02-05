import type { NextPage } from "next";
import { Book } from "../src/components/book";
import { Layout } from "../src/components/layout";
import { BASE_URL } from "../src/config";
import { SEO } from "../src/components/seo";
import {
  personSchema,
  breadcrumbSchema,
  WEBSITE_ID,
  PERSON_ID,
} from "../src/utils/jsonld";
import {
  Box,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";

const Page: NextPage = () => {
  const bioImages = [
    { src: "/img/image12.jpg", alt: "Portrait de Michel Golfier" },
    { src: "/img/image1.jpg", alt: "Michel Golfier au travail" },
    { src: "/img/image2.jpg", alt: "Michel Golfier dans les archives" },
  ];

  return (
    <>
      <SEO
        title="Biographie de Michel Golfier - Auteur auvergnat"
        description="Né en 1949 à Clermont-Ferrand, Michel Golfier est un auteur auvergnat passionné par l'histoire locale et le patrimoine de la région Auvergne-Rhône-Alpes."
        url={`${BASE_URL}/biographie`}
        ogType="profile"
        profile={{ firstName: "Michel", lastName: "Golfier" }}
        images={bioImages.map(img => ({
          url: `${BASE_URL}${img.src}`,
          alt: img.alt,
        }))}
        jsonLd={[
          {
            "@type": "WebPage",
            "@id": `${BASE_URL}/biographie#webpage`,
            url: `${BASE_URL}/biographie`,
            name: "Michel Golfier | Biographie",
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
          },
          personSchema,
          breadcrumbSchema([
            { name: "Accueil", item: BASE_URL },
            { name: "Biographie" },
          ]),
        ]}
      />
      <Layout
        wrapperProps={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* En-tête avec photo */}
        <Box
          width="100%"
          maxWidth="80vw"
          marginBottom={8}
          textAlign="center"
        >
          <Text
            as="h1"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="5xl"
            marginBottom={6}
          >
            Biographie
          </Text>
          <Box
            position="relative"
            width="100%"
            maxWidth="400px"
            height="400px"
            margin="0 auto"
            borderRadius="full"
            overflow="hidden"
            borderWidth={4}
            borderColor="gray.200"
          >
            <NextImage
              src="/img/image12.jpg"
              alt="Portrait de Michel Golfier"
              width={400}
              height={400}
              priority
            />
          </Box>
        </Box>

        {/* Section biographie */}
        <Box as="section" aria-labelledby="bio-heading" width="100%" maxWidth="80vw">
          <Text
            id="bio-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="3xl"
            marginBottom={4}
          >
            À propos de l'auteur
          </Text>
          <Stack spacing={4}>
            <Text fontSize="lg">
              Michel Golfier est né le 29 novembre 1949 à Clermont-Ferrand, après avoir travaillé trente-huit ans dans la fonction publique hospitalière il se consacre à l'écriture. L'ensemble de ses ouvrages reflètent bien toute sa sensibilité pour le terroir.
            </Text>
            <Text fontSize="lg">
              Attaché à ses racines Auvergnates, il est notamment l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps jusqu'au milieu du XXème siècle. Faisant sienne cette citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est une bibliothéque qui brûle » cela est vrai quelque que soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable d'accueillir la mémoire ou tellement peu.
            </Text>
          </Stack>
        </Box>

        {/* Section ouvrages */}
        <Box as="section" aria-labelledby="works-heading" width="100%" maxWidth="80vw" marginTop={8}>
          <Text
            id="works-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="3xl"
            marginBottom={4}
          >
            Ses Ouvrages
          </Text>
          <Stack spacing={4}>
            <Text fontSize="lg">
              Dans son premier livre, il décrit la vie des villageois et du monde rural de son village sur 150 ans à travers certains événements agricoles ou politiques qui marquèrent la France à différentes époques. Neschers a eu un passé préhistorique et historique important, y furent trouvées notamment, des monnaies celtiques, des poteries et des traces de construction Gallo-Romaine, mais aussi une sculpture en calcaire tendre « Le cavalier à l'anguipède »
            </Text>
            <Text fontSize="lg">
              Dans le second, il retrace l'existence et l'oeuvre d'un éminent et remarquable savant paléontologiste du XIXème siècle qui de surcroît été curé de Neschers, il fit tout au long de sa vie de nombreuses découvertes d'ossements fossilisés, mais aussi d'un bois de renne gravé par la main de l'homme représentant un cheval daté d'environ 12.000 ans. Il donna de nombreuses conférences en France et en Europe et fut membre de plusieurs instituts.
            </Text>
            <Text fontSize="lg">
              Dans un troisième, il évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920 etc., la vie des hommes faite de labeur dans cette France paysanne sous la Royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce notamment à l'école de la République, mais aussi aux progrès réalisés dans divers domaines, tels que : l'hygiène, la médecine, sans oublier bien évidemment la chirurgie, tout cela contribua grandement à faire reculer l'âge de la mort. L'apport des sciences et des nouvelles techniques facilitèrent de beaucoup la vie quotidienne de nos concitoyens. Mais Hélas ! ils n'allaient pas échapper aux divers conflits qui allaient marquer et endeuiller les familles dans ce XXème siècle.
            </Text>
          </Stack>
        </Box>

        {/* Photothèque */}
        <Box as="section" aria-labelledby="gallery-heading" width="100%" maxWidth="80vw" marginTop={8}>
          <Text
            id="gallery-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="3xl"
            marginBottom={4}
            textAlign="center"
          >
            Photothèque
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {bioImages.map((img, index) => (
              <Box
                key={index}
                width="100%"
                height="250px"
                borderRadius="lg"
                overflow="hidden"
                borderWidth={2}
                borderColor="gray.200"
              >
                <NextImage
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={250}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Section citations */}
        <Box as="section" aria-labelledby="quote-heading" width="100%" maxWidth="60vw" marginTop={8}>
          <Box
            padding={6}
            backgroundColor="gray.50"
            borderRadius="lg"
            borderLeftWidth={4}
            borderLeftColor="blue.500"
          >
            <Text
              id="quote-heading"
              as="h2"
              fontFamily="Oooh Baby"
              fontWeight="600"
              fontSize="2xl"
              marginBottom={4}
            >
              Citation favorite
            </Text>
            <Text fontSize="lg" fontStyle="italic" color="gray.700">
              « Quand un vieillard meurt, c'est toute une bibliothèque qui brûle »
            </Text>
            <Text fontSize="md" color="gray.600" marginTop={2}>
              — Amadou Hampaté Bâ
            </Text>
          </Box>
        </Box>

        {/* CTA Contact */}
        <Box
          width="100%"
          maxWidth="80vw"
          marginTop={8}
          padding={6}
          backgroundColor="blue.50"
          borderRadius="lg"
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="600" marginBottom={2}>
            Vous souhaitez en savoir plus ?
          </Text>
          <Text marginBottom={4}>
            N'hésitez pas à contacter Michel Golfier pour toute question sur ses ouvrages.
          </Text>
          <NextLink href="/contact">
            <Link
              as="button"
              paddingX={8}
              paddingY={3}
              backgroundColor="blue.500"
              color="white"
              borderRadius="md"
              fontWeight="600"
              _hover={{ backgroundColor: "blue.600" }}
              _active={{ backgroundColor: "blue.700" }}
            >
              Contacter l'auteur
            </Link>
          </NextLink>
        </Box>
      </Layout>
    </>
  );
};

export default Page;

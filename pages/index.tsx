import type { NextPage } from "next";
import { Book } from "../src/components/book";
import { Layout } from "../src/components/layout";
import { BASE_URL } from "../src/config";
import { SEO } from "../src/components/seo";
import { personSchema, websiteSchema } from "../src/utils/jsonld";
import { Book1992, Book1998, Book2017 } from "../src/data";
import { Box, Stack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";

const books = [Book1992, Book1998, Book2017];

const Page: NextPage = () => {
  return (
    <>
      <SEO
        title="Michel Golfier, auteur auvergnat - Histoire locale de l'Auvergne"
        description="Découvrez les ouvrages de Michel Golfier, auteur auvergnat spécialisé dans l'histoire locale du Puy-de-Dôme et de l'Auvergne. Livres sur Neschers, Plauzat et Jean-Baptiste Croizet."
        images={[
          { url: `${BASE_URL}/img/livre1.jpg`, width: 600, height: 850, alt: "L'Histoire d'un village du Puy-de-Dôme de l'an 1830 à nos jours, Neschers" },
          { url: `${BASE_URL}/img/livre2.jpg`, width: 600, height: 850, alt: "Jean-Baptiste Croizet, curé de Neschers et paléontologue" },
          { url: `${BASE_URL}/img/livre3.jpg`, width: 600, height: 850, alt: "Quelques notes prises au fil du temps sur Plauzat et ses villages voisins" },
        ]}
        jsonLd={[
          websiteSchema,
          personSchema,
          {
            "@type": "ItemList",
            name: "Ouvrages de Michel Golfier",
            numberOfItems: books.length,
            itemListElement: books.map((book, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${BASE_URL}/ouvrages/${book.key}`,
              name: book.title,
            })),
          },
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Quels sont les sujets des livres de Michel Golfier ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les ouvrages de Michel Golfier traitent de l'histoire locale de l'Auvergne et du Puy-de-Dôme, notamment les villages de Neschers et Plauzat, ainsi que du paléontologue Jean-Baptiste Croizet.",
                },
              },
              {
                "@type": "Question",
                name: "Comment acheter les livres de Michel Golfier ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Vous pouvez contacter Michel Golfier via le formulaire de contact pour commander ses ouvrages. Certains livres sont également disponibles sur Amazon.",
                },
              },
            ],
          },
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
        {/* Hero Section - Présentation de l'auteur */}
        <Box as="section" aria-labelledby="hero-heading">
          <Book
            titleAs="h1"
            title="Michel Golfier, auteur auvergnat"
            summary={[
              "Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire.",
            ]}
            wrapperProps={{ maxWidth: "80vw" }}
          />
        </Box>

        {/* Section Ouvrages */}
        <Box as="section" aria-labelledby="ouvrages-heading" marginTop="3rem">
          <Text
            id="ouvrages-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="4xl"
            textAlign="center"
            marginBottom="2rem"
          >
            Mes Ouvrages
          </Text>
          <Stack spacing={8} width="100%" maxWidth="80vw">
            <article>
              <Book
                titleAs="h3"
                title="L'Histoire d'un village du Puy-de-Dôme de l'an 1830 à nos jours, Neschers."
                summary={[
                  "Dans mon premier livre, je décris la vie des villageois et du monde rural de mon village sur 150 ans à travers certains événements politiques ou agricoles qui marquèrent la France à différentes époques et qui eurent des répercussions dans les villages de l'hexagone. Neschers a eu un passé préhistorique et historique important, comme dans beaucoup de bourgs de notre région d'ailleurs. Furent trouvées notamment des monnaies celtiques, des poteries, des traces de construction Gallo-Romaine, mais aussi une sculpture en arkose « le cavalier à l'anguipède ».",
                ]}
                image="/img/livre1.jpg"
                href="/ouvrages/l-histoire-de-neschers"
              />
            </article>
            <article>
              <Book
                titleAs="h3"
                title="Jean-Baptiste Croizet, curé de Neschers et paléontologue."
                summary={[
                  "Dans un second, je retrace l'existence et l'oeuvre d'un éminent et remarquable savant paléontologiste du XIXème siècle qui de surcroit été curé de Neschers, tout au long de sa destinée il fit de nombreuses découvertes d'ossements fossilisés, mais aussi un bois de renne sculpté où été représenté un cheval, Il donna de nombreuses conférences en France et en Europe, et fut membres de plusieurs instituts.",
                ]}
                image="/img/livre2.jpg"
                isReverse
                href="/ouvrages/jean-baptiste-croizet"
              />
            </article>
            <article>
              <Book
                titleAs="h3"
                title="Quelques notes prises au fil du temps sur Plauzat et ses villages voisins."
                summary={[
                  "Dans le troisième, j'évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920…etc. la vie des hommes faite de labeur dans cette France paysanne sous la royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce surtout aux progrès et avancées réalisés dans divers domaines tels que, l'hygiène et la médecine qui contribuèrent grandement à faire reculer l'âge de la mort, l'éducation fut un facteur important pour la prise de conscience d'un grand nombre d'entre eux pour la liberté et la démocratie, sans oublier bien évidemment l'apport des sciences et de nouvelles techniques qui facilitèrent grandement la vie quotidienne de nos concitoyens. Mais hélas ! ils n'allaient pas échapper à divers conflits.",
                ]}
                image="/img/livre3.jpg"
                href="/ouvrages/notes-plauzat-villages-voisins"
              />
            </article>
          </Stack>
        </Box>

        {/* Section Dernier ouvrage */}
        <Box as="section" aria-labelledby="dernier-ouvrage-heading" marginTop="3rem">
          <Book
            titleAs="h2"
            title="L'Homme et son devenir trois siècles de notes prises en Auvergne et ailleurs."
            summary={[
              "Cet ouvrage tire ses origines d'archives notariales sur l'Auvergne des XVIIème, XVIIIème et XIXème siècles, ainsi que sur diverses décisions de conseils municipaux du XIXème et début XXème siècle.",
              "Au cours de ce voyage, plusieurs thèmes sont alors abordés : L'Ancien Régime, la Révolution, l'industrialisation, le travail de la vigne, l'alcool et ses ravages dans la population, l'apprentissage sous l'Ancien Régime, l'enseignement (religieux et laïque), les deux guerres mondiales, la condition de la femme d'hier à aujourd'hui, de sa lente mais progressive indépendance, enfin reconnue comme un Être à part entière, prenant de plus en plus de responsabilité, au sein même de l'encadrement (cadres A dans la fonction publique, cadres supérieures dans le privé, patronnes de start-up, élues parlementaires, mais aussi présentes dans toutes les professions libérales.)",
              "Le XXIème siècle n'est pas oublié, d'autres événements sont aussi présents dans cet ouvrage tels que : le terrorisme, l'écologie, l'exploitation des enfants au travail, (subissant aussi les abus de prédateurs.) Conflits et bruits de bottes sur différentes frontières de notre planète, avec notamment l'invasion de l'Ukraine par la Russie.",
              "La folie meurtrière des hommes allait les emportés vers deux grands conflits, et si aujourd'hui les guerres ont changé de champs de bataille s'exportant vers d'autres continents, en ce début du XXIème siècle, le monde doit faire face à un nouveau danger qu'est le terrorisme salafiste radical proclamant le djihad et la charia, tuant ou blessant des centaines de milliers d'innocents en France, en Europe et dans le monde.",
              "Afin d'acquérir un ou plusieurs exemplaires, contactez-moi via le formulaire de contact. Je vous répondrai dans les plus brefs délais.",
            ]}
            wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
            isReverse
            image="/img/livre4.jpg"
            href="/contact"
          />
        </Box>

        {/* Section FAQ */}
        <Box as="section" aria-labelledby="faq-heading" marginTop="3rem" maxWidth="80vw">
          <Text
            id="faq-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="4xl"
            textAlign="center"
            marginBottom="2rem"
          >
            Questions Fréquentes
          </Text>
          <Stack spacing={6}>
            <Box>
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={2}>
                Quels sont les sujets traités dans vos livres ?
              </Text>
              <Text>
                Mes ouvrages traitent de l'histoire locale de l'Auvergne et du Puy-de-Dôme, notamment les villages de Neschers et Plauzat, ainsi que du paléontologue Jean-Baptiste Croizet. Je m'appuie sur des archives notariales et des délibérations des conseils municipaux pour retracer la vie de nos ancêtres.
              </Text>
            </Box>
            <Box>
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={2}>
                Comment acheter vos livres ?
              </Text>
              <Text>
                Vous pouvez me contacter via le{" "}
                <NextLink href="/contact">
                  <Link color="blue.500">formulaire de contact</Link>
                </NextLink>
                pour commander mes ouvrages. Certains livres sont également disponibles sur Amazon.
              </Text>
            </Box>
            <Box>
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={2}>
                Proposez-vous des séances de dédicace ?
              </Text>
              <Text>
                Je suis disponible pour des séances de dédicace dans la région Auvergne-Rhône-Alpes. N'hésitez pas à me contacter pour en discuter.
              </Text>
            </Box>
            <Box>
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={2}>
                Vos livres sont-ils disponibles en format numérique ?
              </Text>
              <Text>
                Oui, vous pouvez consulter gratuitement des extraits de mes ouvrages directement sur ce site. Les versions complètes sont disponibles en format PDF ou papier.
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Section Extraits de lecture */}
        <Box as="section" aria-labelledby="excerpts-heading" marginTop="3rem" maxWidth="80vw">
          <Text
            id="excerpts-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="4xl"
            textAlign="center"
            marginBottom={6}
          >
            Découvrez mes Ouvrages
          </Text>
          <Text fontSize="lg" textAlign="center" marginBottom={8}>
            Parcourez gratuitement des extraits de mes livres pour vous immerger dans l'histoire de notre région
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              padding={6}
              backgroundColor="white"
              borderRadius="lg"
              borderWidth={1}
              borderColor="gray.200"
              _hover={{ shadow: "md", transform: "translateY(-4px)" }}
              transition="all 0.2s"
            >
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={3} color="blue.600">
                Neschers
              </Text>
              <Text fontSize="sm" color="gray.600" marginBottom={4}>
                L'histoire d'un village du Puy-de-Dôme de 1830 à nos jours
              </Text>
              <Text fontSize="sm" fontStyle="italic" color="gray.500" marginBottom={4}>
                "De souffrance en joie, de désespoir en espérance, l'homme traversa avec courage les épreuves du temps..."
              </Text>
              <NextLink href="/ouvrages/l-histoire-de-neschers">
                <Link color="blue.500" fontWeight="600">
                  Lire l'extrait →
                </Link>
              </NextLink>
            </Box>
            <Box
              padding={6}
              backgroundColor="white"
              borderRadius="lg"
              borderWidth={1}
              borderColor="gray.200"
              _hover={{ shadow: "md", transform: "translateY(-4px)" }}
              transition="all 0.2s"
            >
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={3} color="blue.600">
                Jean-Baptiste Croizet
              </Text>
              <Text fontSize="sm" color="gray.600" marginBottom={4}>
                Curé de Neschers et paléontologue du XIXème siècle
              </Text>
              <Text fontSize="sm" fontStyle="italic" color="gray.500" marginBottom={4}>
                "Il fit tout au long de sa vie de nombreuses découvertes d'ossements fossilisés, mais aussi d'un bois de renne gravé..."
              </Text>
              <NextLink href="/ouvrages/jean-baptiste-croizet">
                <Link color="blue.500" fontWeight="600">
                  Lire l'extrait →
                </Link>
              </NextLink>
            </Box>
            <Box
              padding={6}
              backgroundColor="white"
              borderRadius="lg"
              borderWidth={1}
              borderColor="gray.200"
              _hover={{ shadow: "md", transform: "translateY(-4px)" }}
              transition="all 0.2s"
            >
              <Text as="h3" fontWeight="600" fontSize="xl" marginBottom={3} color="blue.600">
                Plauzat
              </Text>
              <Text fontSize="sm" color="gray.600" marginBottom={4}>
                Notes prises au fil du temps sur Plauzat et ses villages voisins
              </Text>
              <Text fontSize="sm" fontStyle="italic" color="gray.500" marginBottom={4}>
                "Comment apprécier son présent et construire son avenir si l'on ignore son passé ?"
              </Text>
              <NextLink href="/ouvrages/notes-plauzat-villages-voisins">
                <Link color="blue.500" fontWeight="600">
                  Lire l'extrait →
                </Link>
              </NextLink>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Section Contact CTA */}
        <Box as="section" aria-labelledby="contact-cta-heading" marginTop="3rem" textAlign="center">
          <Text
            id="contact-cta-heading"
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="3xl"
            marginBottom={4}
          >
            Intéressé par mes ouvrages ?
          </Text>
          <Text fontSize="lg" marginBottom={6}>
            Contactez-moi pour plus d'informations ou pour commander
          </Text>
          <NextLink href="/contact">
            <Link
              as="button"
              paddingX={8}
              paddingY={4}
              backgroundColor="blue.500"
              color="white"
              borderRadius="md"
              fontWeight="600"
              _hover={{ backgroundColor: "blue.600" }}
              _active={{ backgroundColor: "blue.700" }}
            >
              Me contacter
            </Link>
          </NextLink>
        </Box>
      </Layout>
    </>
  );
};

export default Page;

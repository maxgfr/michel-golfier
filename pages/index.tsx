import type { NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";
import { Book } from "../src/components/book";
import { Layout } from "../src/components/layout";
import { BASE_URL } from "../src/config";
import { SEO } from "../src/components/seo";
import { personSchema, websiteSchema } from "../src/utils/jsonld";
import { Book1992, Book1998, Book2017 } from "../src/data";

const books = [Book1992, Book1998, Book2017];

const Page: NextPage = () => {
  return (
    <>
      <SEO
        title="Michel Golfier, auteur auvergnat"
        description="Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles."
        images={[
          { url: `${BASE_URL}/img/livre1.jpg`, width: 600, height: 850, alt: "L'Histoire d'un village du Puy-de-Dôme" },
          { url: `${BASE_URL}/img/livre2.jpg`, width: 600, height: 850, alt: "Jean-Baptiste Croizet, curé de Neschers" },
          { url: `${BASE_URL}/img/livre3.jpg`, width: 600, height: 850, alt: "Notes sur Plauzat et ses villages voisins" },
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
        ]}
      />
      <Layout>
        {/* Hero section */}
        <Box textAlign="center" mb={{ base: 10, md: 16 }}>
          <Text
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="700"
            color="brand.800"
            fontStyle="italic"
            lineHeight="shorter"
          >
            Michel Golfier
          </Text>
          <Text
            fontFamily="heading"
            fontSize={{ base: "md", md: "lg" }}
            color="warmGray.500"
            mt={2}
            letterSpacing="0.15em"
            textTransform="uppercase"
            fontWeight="400"
          >
            Auteur auvergnat
          </Text>
          {/* Decorative ornament */}
          <Box display="flex" alignItems="center" justifyContent="center" my={6}>
            <Box flex={1} maxW="80px" h="1px" bg="brand.300" />
            <Text mx={4} color="brand.400" fontSize="lg">&#9671;</Text>
            <Box flex={1} maxW="80px" h="1px" bg="brand.300" />
          </Box>
          <Text
            maxW="650px"
            mx="auto"
            fontSize="lg"
            lineHeight="tall"
            color="warmGray.600"
            fontStyle="italic"
          >
            &laquo;&nbsp;Quand un vieillard meurt, c&rsquo;est toute une bibliothèque qui brûle&nbsp;&raquo;
          </Text>
          <Text fontSize="sm" color="warmGray.400" mt={2}>
            &mdash; Amadou Hampaté Bâ
          </Text>
        </Box>

        {/* Introduction */}
        <Box maxW="750px" mx="auto" mb={{ base: 10, md: 16 }} textAlign="center">
          <Text fontSize="md" lineHeight="tall" color="warmGray.700">
            Attaché à mes racines Auvergnates, je suis l&rsquo;auteur de trois livres
            ayant tous le même dénominateur commun à savoir la vie locale
            d&rsquo;autrefois, remontant parfois le temps sur plusieurs siècles. Faute de
            n&rsquo;avoir pas su ou pu interroger nos anciens, nous n&rsquo;avons pas été
            capable, ou tellement peu d&rsquo;accueillir la mémoire.
          </Text>
        </Box>

        {/* Section title */}
        <Box textAlign="center" mb={10}>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color="brand.800"
          >
            Mes ouvrages
          </Text>
          <Box width="40px" height="1px" bg="brand.400" mx="auto" mt={3} />
        </Box>

        {/* Books */}
        <Box display="flex" flexDirection="column" gap={8}>
          <Book
            titleAs="h3"
            title="L'Histoire d'un village du Puy-de-Dôme de l'an 1830 à nos jours, Neschers."
            summary={[
              "Dans mon premier livre, je décris la vie des villageois et du monde rural de mon village sur 150 ans à travers certains événements politiques ou agricoles qui marquèrent la France à différentes époques et qui eurent des répercussions dans les villages de l'hexagone. Neschers a eu un passé préhistorique et historique important, comme dans beaucoup de bourgs de notre région d'ailleurs. Furent trouvées notamment des monnaies celtiques, des poteries, des traces de construction Gallo-Romaine, mais aussi une sculpture en arkose « le cavalier à l'anguipède ».",
            ]}
            image="/img/livre1.jpg"
            href="/ouvrages/l-histoire-de-neschers"
          />
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
          <Book
            titleAs="h3"
            title="Quelques notes prises au fil du temps sur Plauzat et ses villages voisins."
            summary={[
              "Dans le troisième, j'évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920…etc. la vie des hommes faite de labeur dans cette France paysanne sous la royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce surtout aux progrès et avancées réalisés dans divers domaines tels que, l'hygiène et la médecine qui contribuèrent grandement à faire reculer l'âge de la mort, l'éducation fut un facteur important pour la prise de conscience d'un grand nombre d'entre eux pour la liberté et la démocratie, sans oublier bien évidemment l'apport des sciences et de nouvelles techniques qui facilitèrent grandement la vie quotidienne de nos concitoyens. Mais hélas ! ils n'allaient pas échapper à divers conflits.",
            ]}
            image="/img/livre3.jpg"
            href="/ouvrages/notes-plauzat-villages-voisins"
          />
          <Book
            titleAs="h3"
            title="L'Homme et son devenir trois siècles de notes prises en Auvergne et ailleurs."
            summary={[
              "Cet ouvrage tire ses origines d'archives notariales sur l’Auvergne des XVIIème, XVIIIème et XIXème siècles, ainsi que sur diverses décisions de conseils municipaux du XIXème et début XXème siècle.",
              "Au cours de ce voyage, plusieurs thèmes sont alors abordés : L’Ancien Régime, la Révolution, l’industrialisation, le travail de la vigne, l’alcool et ses ravages dans la population, l’apprentissage sous l’Ancien Régime, l’enseignement (religieux et laïque), les deux guerres mondiales, la condition de la femme d’hier à aujourd’hui, de sa lente mais progressive indépendance, enfin reconnue comme un Être à part entière, prenant de plus en plus de responsabilité, au sein même de l’encadrement (cadres A dans la fonction publique, cadres supérieures dans le privé, patronnes de start-up, élues parlementaires, mais aussi présentes dans toutes les professions libérales.)",
              "Le XXIème siècle n’est pas oublié, d’autres événements sont aussi présents dans cet ouvrage tels que : le terrorisme, l’écologie, l’exploitation des enfants au travail, (subissant aussi les abus de prédateurs.) Conflits et bruits de bottes sur différentes frontières de notre planète, avec notamment l’invasion de l’Ukraine par la Russie.",
              "La folie meurtrière des hommes allait les emportés vers deux grands conflits, et si aujourd'hui les guerres ont changé de champs de bataille s'exportant vers d'autres continents, en ce début du XXIème siècle, le monde doit faire face à un nouveau danger qu'est le terrorisme salafiste radical proclamant le djihad et la charia, tuant ou blessant des centaines de milliers d'innocents en France, en Europe et dans le monde.",
              "Afin d'acquérir un ou plusieurs exemplaires, contactez-moi via le formulaire de contact. Je vous répondrai dans les plus brefs délais.",
          ]}
            isReverse
            image="/img/livre4.jpg"
            href="/contact"
          />
        </Box>
      </Layout>
    </>
  );
};

export default Page;

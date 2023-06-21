import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Book } from "../src/components/book";
import { Layout } from "../src/components/layout";
import { BASE_URL } from "../src/config";
import Head from "next/head";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              name: "Michel Golfier",
              url: BASE_URL,
            }),
          }}
        />
      </Head>
      <NextSeo
        title="Michel Golfier, auteur auvergnat"
        description="Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire."
        openGraph={{
          url: BASE_URL,
          title: "Michel Golfier, auteur auvergnat",
          description:
            "Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire.",
          images: [
            {
              url: `${BASE_URL}/img/livre1.jpg`,
              width: 600,
              height: 850,
              alt: "L'Histoire d'un village du Puy-de-Dôme de l'an 1830 à nos jours, Neschers",
              type: "image/jpeg",
            },
            {
              url: `${BASE_URL}/img/livre2.jpg`,
              width: 600,
              height: 850,
              alt: "Jean-Baptiste Croizet, curé de Neschers et paléontologue",
              type: "image/jpeg",
            },
            {
              url: `${BASE_URL}/img/livre3.jpg`,
              width: 600,
              height: 850,
              alt: "Quelques notes prises au fil du temps sur Plauzat et ses villages voisins",
              type: "image/jpeg",
            },
          ],
          site_name: "Michel Golfier",
          locale: "fr_FR",
          type: "website",
        }}
      />
      <Layout
        wrapperProps={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Book
          titleAs="h1"
          title="Michel Golfier, auteur auvergnat"
          summary={[
            "Attaché à mes racines Auvergnates, je suis l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps sur plusieurs siècles. Faisant mienne la citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est toute une bibliothéque qui brûle » cela est vrai quelque soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable, ou tellement peu d'accueillir la mémoire.",
          ]}
          wrapperProps={{ maxWidth: "80vw" }}
        />
        <Book
          titleAs="h2"
          title="L'Histoire d'un village du Puy-de-Dôme de l'an 1830 à nos jours, Neschers."
          summary={[
            "Dans mon premier livre, je décris la vie des villageois et du monde rural de mon village sur 150 ans à travers certains événements politiques ou agricoles qui marquèrent la France à différentes époques et qui eurent des répercussions dans les villages de l'hexagone. Neschers a eu un passé préhistorique et historique important, comme dans beaucoup de bourgs de notre région d'ailleurs. Furent trouvées notamment des monnaies celtiques, des poteries, des traces de construction Gallo-Romaine, mais aussi une sculpture en arkose « le cavalier à l'anguipède ».",
          ]}
          image="/img/livre1.jpg"
          wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
          href="/ouvrages/l-histoire-de-neschers"
        />
        <Book
          titleAs="h2"
          title="Jean-Baptiste Croizet, curé de Neschers et paléontologue."
          summary={[
            "Dans un second, je retrace l'existence et l'oeuvre d'un éminent et remarquable savant paléontologiste du XIXème siècle qui de surcroit été curé de Neschers, tout au long de sa destinée il fit de nombreuses découvertes d'ossements fossilisés, mais aussi un bois de renne sculpté où été représenté un cheval, Il donna de nombreuses conférences en France et en Europe, et fut membres de plusieurs instituts.",
          ]}
          wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
          image="/img/livre2.jpg"
          isReverse
          href="/ouvrages/jean-baptiste-croizet"
        />
        <Book
          titleAs="h2"
          title="Quelques notes prises au fil du temps sur Plauzat et ses villages voisins."
          summary={[
            "Dans le troisième, j'évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920…etc. la vie des hommes faite de labeur dans cette France paysanne sous la royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce surtout aux progrès et avancées réalisés dans divers domaines tels que, l'hygiène et la médecine qui contribuèrent grandement à faire reculer l'âge de la mort, l'éducation fut un facteur important pour la prise de conscience d'un grand nombre d'entre eux pour la liberté et la démocratie, sans oublier bien évidemment l'apport des sciences et de nouvelles techniques qui facilitèrent grandement la vie quotidienne de nos concitoyens. Mais hélas ! ils n'allaient pas échapper à divers conflits.",
          ]}
          wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
          image="/img/livre3.jpg"
          href="/ouvrages/notes-plauzat-villages-voisins"
        />
        <Book
          titleAs="h2"
          title="L'Homme et son devenir trois siècles de notes prises en Auvergne et ailleurs."
          summary={[
            "Cet ouvrage tire ses origines d'archives notariales sur l’Auvergne des XVIIème, XVIIIème et XIXème siècles, ainsi que sur diverses décisions de conseils municipaux du XIXème et début XXème siècle.",
            "Au cours de ce voyage, plusieurs thèmes sont alors abordés : L’Ancien Régime, la Révolution, l’industrialisation, le travail de la vigne, l’alcool et ses ravages dans la population, l’apprentissage sous l’Ancien Régime, l’enseignement (religieux et laïque), les deux guerres mondiales, la condition de la femme d’hier à aujourd’hui, de sa lente mais progressive indépendance, enfin reconnue comme un Être à part entière, prenant de plus en plus de responsabilité, au sein même de l’encadrement (cadres A dans la fonction publique, cadres supérieures dans le privé, patronnes de start-up, élues parlementaires, mais aussi présentes dans toutes les professions libérales.)",
            "Le XXIème siècle n’est pas oublié, d’autres événements sont aussi présents dans cet ouvrage tels que : le terrorisme, l’écologie, l’exploitation des enfants au travail, (subissant aussi les abus de prédateurs.) Conflits et bruits de bottes sur différentes frontières de notre planète, avec notamment l’invasion de l’Ukraine par la Russie.",
            "La folie meurtrière des hommes allait les emportés vers deux grands conflits, et si aujourd'hui les guerres ont changé de champs de bataille s'exportant vers d'autres continents, en ce début du XXIème siècle, le monde doit faire face à un nouveau danger qu'est le terrorisme salafiste radical proclamant le djihad et la charia, tuant ou blessant des centaines de milliers d'innocents en France, en Europe et dans le monde.",
            "Afin d'acquérir un ou plusieurs exemplaires, contactez-moi via le formulaire de contact. Je vous répondrai dans les plus brefs délais.",
          ]}
          wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
          isReverse
          image="/img/livre4.jpg"
          href="/contact"
        />
      </Layout>
    </>
  );
};

export default Page;

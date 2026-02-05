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

const Page: NextPage = () => {
  return (
    <>
      <SEO
        title="Michel Golfier | Biographie"
        description="Biographie de l'écrivain auvergnat, Michel Golfier."
        url={`${BASE_URL}/biographie`}
        ogType="profile"
        profile={{ firstName: "Michel", lastName: "Golfier" }}
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
        <Book
          titleAs="h1"
          title="Biographie"
          summary={[
            "Michel Golfier est né le 29 novembre 1949 à Clermont-Ferrand, après avoir travaillé trente-huit ans dans la fonction publique hospitalière il se consacre à l'écriture. L'ensemble de ses ouvrages reflètent bien toute sa sensibilité pour le terroir.",
            "Attaché à ses racines Auvergnates, il est notamment l'auteur de trois livres ayant tous le même dénominateur commun à savoir la vie locale d'autrefois, remontant parfois le temps jusqu'au milieu du XXème siècle. Faisant sienne cette citation d'un écrivain Africain Amadou Hampaté Bâ « quand un vieillard meurt, c'est une bibliothéque qui brûle » cela est vrai quelque que soit le pays ou le peuple. Faute de n'avoir pas su ou pu interroger nos anciens, nous n'avons pas été capable d'accueillir la mémoire ou tellement peu.",
            "Dans son premier livre, il décrit la vie des villageois et du monde rural de son village sur 150 ans à travers certains événements agricoles ou politiques qui marquèrent la France à différentes époques. Neschers a eu un passé préhistorique et historique important, y furent trouvées notamment, des monnaies celtiques, des poteries et des traces de construction Gallo-Romaine, mais aussi une sculpture en calcaire tendre « Le cavalier à l'anguipède »",
            "Dans le second, il retrace l'existence et l'oeuvre d'un éminent et remarquable savant paléontologiste du XIXème siècle qui de surcroît été curé de Neschers, il fit tout au long de sa vie de nombreuses découvertes d'ossements fossilisés, mais aussi d'un bois de renne gravé par la main de l'homme représentant un cheval daté d'environ 12.000 ans. Il donna de nombreuses conférences en France et en Europe et fut membre de plusieurs instituts.",
            "Dans un troisième, il évoque à l'aide d'archives privées des XVIIème, XVIIIème et XIXème siècles, de délibérations des conseils municipaux de Plauzat de 1838 à 1920 etc., la vie des hommes faite de labeur dans cette France paysanne sous la Royauté, mais aussi de leur émancipation au cours du temps et au grés des évènements, grâce notamment à l'école de la République, mais aussi aux progrès réalisés dans divers domaines, tels que : l'hygiène, la médecine, sans oublier bien évidemment la chirurgie, tout cela contribua grandement à faire reculer l'âge de la mort. L'apport des sciences et des nouvelles techniques facilitèrent de beaucoup la vie quotidienne de nos concitoyens. Mais Hélas ! ils n'allaient pas échapper aux divers conflits qui allaient marquer et endeuiller les familles dans ce XXème siècle.",
          ]}
          wrapperProps={{ marginTop: 10, maxWidth: "80vw" }}
        />
      </Layout>
    </>
  );
};

export default Page;

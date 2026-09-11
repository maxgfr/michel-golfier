import Head from "next/head";
import { BASE_URL } from "../config";

type OGImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

const DEFAULT_IMAGE: OGImage = {
  url: `${BASE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Michel Golfier, auteur auvergnat, et les couvertures de ses quatre ouvrages",
};

type SEOProps = {
  title: string;
  description: string;
  url?: string;
  ogType?: "website" | "profile" | "book";
  images?: OGImage[];
  profile?: { firstName: string; lastName: string };
  book?: { releaseDate?: string; isbn?: string; tags?: string[] };
  jsonLd?: object[];
  noIndex?: boolean;
};

export function SEO({
  title,
  description,
  url = BASE_URL,
  ogType = "website",
  images,
  profile,
  book,
  jsonLd,
  noIndex = false,
}: SEOProps) {
  const ogImages = images?.length ? images : [DEFAULT_IMAGE];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Une page d'erreur n'a pas d'URL canonique : `url` vaut alors l'accueil, et
          la déclarer reviendrait à annoncer aux moteurs que chaque 404 est l'accueil. */}
      {noIndex ? (
        <meta name="robots" content="noindex,follow" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImages[0].url} />

      <meta property="og:site_name" content="Michel Golfier" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {ogImages.flatMap((img, i) => [
        <meta key={`img-${i}`} property="og:image" content={img.url} />,
        ...(img.alt
          ? [<meta key={`img-alt-${i}`} property="og:image:alt" content={img.alt} />]
          : []),
        ...(img.width
          ? [<meta key={`img-w-${i}`} property="og:image:width" content={String(img.width)} />]
          : []),
        ...(img.height
          ? [<meta key={`img-h-${i}`} property="og:image:height" content={String(img.height)} />]
          : []),
      ])}

      {profile && [
        <meta key="pf-fn" property="og:profile:first_name" content={profile.firstName} />,
        <meta key="pf-ln" property="og:profile:last_name" content={profile.lastName} />,
        <meta key="pf-g" property="og:profile:gender" content="male" />,
        <meta key="pf-u" property="og:profile:username" content="michelgolfier" />,
      ]}

      {book && [
        ...(book.releaseDate
          ? [<meta key="bk-date" property="og:book:release_date" content={book.releaseDate} />]
          : []),
        ...(book.isbn
          ? [<meta key="bk-isbn" property="og:book:isbn" content={book.isbn} />]
          : []),
        ...(book.tags?.map((tag, i) => (
          <meta key={`bk-tag-${i}`} property="og:book:tag" content={tag} />
        )) || []),
      ]}

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": jsonLd,
            }),
          }}
        />
      )}
    </Head>
  );
}

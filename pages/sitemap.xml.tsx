import { GetServerSideProps } from "next";
import { BASE_URL } from "../src/config";
import { Book1992, Book1998, Book2017 } from "../src/data";

const books = [Book1992, Book1998, Book2017];

/**
 * Dates de dernière modification réelle, à mettre à jour à la main quand le contenu
 * d'une page change. Un `lastmod` recalculé à chaque requête ne veut rien dire et
 * les moteurs finissent par l'ignorer.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-02-24",
  "/biographie": "2026-02-24",
  "/contact": "2026-02-06",
  "/ouvrages/l-histoire-de-neschers": "2026-02-06",
  "/ouvrages/jean-baptiste-croizet": "2026-02-06",
  "/ouvrages/notes-plauzat-villages-voisins": "2026-02-06",
};

const FALLBACK_LAST_MODIFIED = "2026-02-06";

function lastmodFor(route: string): string {
  return LAST_MODIFIED[route] ?? FALLBACK_LAST_MODIFIED;
}

export default function Sitemap() {
  // This component is never rendered - we only use getServerSideProps
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = [
    {
      loc: BASE_URL,
      priority: "1.0",
      lastmod: lastmodFor("/"),
      changefreq: "weekly",
    },
    {
      loc: `${BASE_URL}/biographie`,
      priority: "0.8",
      lastmod: lastmodFor("/biographie"),
      changefreq: "monthly",
    },
    {
      loc: `${BASE_URL}/contact`,
      priority: "0.5",
      lastmod: lastmodFor("/contact"),
      changefreq: "monthly",
    },
    ...books.map((book) => ({
      loc: `${BASE_URL}/ouvrages/${book.key}`,
      priority: "0.9",
      lastmod: lastmodFor(`/ouvrages/${book.key}`),
      changefreq: "monthly",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

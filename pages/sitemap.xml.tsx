import { GetServerSideProps } from "next";
import { Book1992, Book1998, Book2017 } from "../src/data";

const books = [Book1992, Book1998, Book2017];

export default function Sitemap() {
  // This component is never rendered - we only use getServerSideProps
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.michelgolfier.fr";
  const currentDate = new Date().toISOString();

  const urls = [
    {
      loc: baseUrl,
      priority: "1.0",
      lastmod: currentDate,
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/biographie`,
      priority: "0.8",
      lastmod: currentDate,
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/contact`,
      priority: "0.5",
      lastmod: currentDate,
      changefreq: "monthly",
    },
    ...books.map((book) => ({
      loc: `${baseUrl}/ouvrages/${book.key}`,
      priority: "0.9",
      lastmod: currentDate,
      changefreq: "monthly",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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

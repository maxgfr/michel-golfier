import type { NextPage } from "next";
import { NextSeo } from "next-seo";

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
        {/* <ImageGallery
          items={generateImageGallery()}
          useBrowserFullscreen={true}
        /> */}
      </div>
    </>
  );
};

export default Page;

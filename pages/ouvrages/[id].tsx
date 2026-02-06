import { useCallback, useState } from "react";
import {
  Button,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import xss from "xss";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import type { GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Layout } from "../../src/components/layout";
import { SEO } from "../../src/components/seo";
import { BASE_URL } from "../../src/config";
import { type Book, Book1992, Book1998, Book2017 } from "../../src/data";
import { PERSON_ID, WEBSITE_ID, breadcrumbSchema, entityToSchema } from "../../src/utils/jsonld";

const BookReader = dynamic(() => import("../../src/components/pdf"), {
  ssr: false,
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
      <Text color="warmGray.500" fontStyle="italic">Chargement du lecteur&hellip;</Text>
    </Box>
  ),
});

const Page: NextPage<{ book: Book }> = ({ book }) => {
  const router = useRouter();

  // Initialize page from URL query param
  const pageNumber = (() => {
    const q = router.query.page;
    if (typeof q === "string") {
      const n = parseInt(q, 10);
      if (n >= 1) return n;
    }
    return 1;
  })();

  const [numPages, setNumPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const plainDescription = book.summary
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: n }: { numPages: number }) => {
      setNumPages(n);
      // Clamp initial page if it exceeds actual page count
      if (pageNumber > n) {
        const url = `/ouvrages/${book.key}?page=${n}`;
        router.replace(url, undefined, { shallow: true });
      }
    },
    [pageNumber, book.key, router]
  );

  const onPageChange = useCallback(
    (page: number) => {
      // Update URL without full navigation (shallow)
      const url = `/ouvrages/${book.key}${page > 1 ? `?page=${page}` : ""}`;
      router.replace(url, undefined, { shallow: true });
    },
    [book.key, router]
  );

  return (
    <>
      <SEO
        title={`Michel Golfier | ${book.title}`}
        description={plainDescription}
        url={`${BASE_URL}/ouvrages/${book.key}`}
        ogType="book"
        images={[book.cover, ...book.images].map(img => ({
          url: `${BASE_URL}${img.source}`,
          alt: img.alt,
        }))}
        book={{
          releaseDate: book.datePublished,
          isbn: book.isbn,
          tags: book.tags,
        }}
        jsonLd={[
          {
            "@type": "WebPage",
            "@id": `${BASE_URL}/ouvrages/${book.key}#webpage`,
            url: `${BASE_URL}/ouvrages/${book.key}`,
            name: `Michel Golfier | ${book.title}`,
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: {
              "@id": `${BASE_URL}/ouvrages/${book.key}#book`,
            },
          },
          {
            "@type": "Book",
            "@id": `${BASE_URL}/ouvrages/${book.key}#book`,
            name: book.title,
            url: `${BASE_URL}/ouvrages/${book.key}`,
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            bookFormat: "EBook",
            datePublished: book.datePublished,
            description: plainDescription,
            image: `${BASE_URL}${book.cover.source}`,
            inLanguage: "fr",
            numberOfPages: book.numberOfPages,
            genre: book.genre,
            keywords: book.tags,
            about: book.entities.map(entityToSchema),
            ...(book.isbn ? { isbn: book.isbn } : {}),
            ...(book.price
              ? {
                  offers: {
                    "@type": "Offer",
                    availability: "https://schema.org/InStock",
                    price: book.price,
                    priceCurrency: "EUR",
                    seller: { "@id": PERSON_ID },
                    ...(book.offerUrl ? { url: book.offerUrl } : {}),
                  },
                }
              : {}),
          },
          breadcrumbSchema([
            { name: "Accueil", item: BASE_URL },
            { name: book.title },
          ]),
        ]}
      />
      <Layout>
        {/* ─── Book title ─── */}
        <Box textAlign="center" mb={6}>
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: "xl", md: "3xl" }}
            color="brand.800"
            fontStyle="italic"
            lineHeight="shorter"
          >
            {book.title}
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center" my={3}>
            <Box flex={1} maxW="60px" h="1px" bg="brand.300" />
            <Text mx={4} color="brand.400" fontSize="lg">&#9671;</Text>
            <Box flex={1} maxW="60px" h="1px" bg="brand.300" />
          </Box>
          <Link
            href={book.path}
            target="_blank"
            rel="noopener noreferrer"
            color="brand.600"
            fontSize="sm"
            fontWeight="500"
            _hover={{ color: "brand.800", textDecoration: "underline" }}
          >
            T&eacute;l&eacute;charger le PDF
            <ExternalLinkIcon mx="4px" boxSize={3} />
          </Link>
        </Box>

        {/* ─── Main content: PDF + Book info side by side ─── */}
        <Box
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: 10 }}
          alignItems="flex-start"
          mb={16}
        >
          {/* PDF Reader */}
          <Box
            flex="0 0 auto"
            width={{ base: "100%", lg: "auto" }}
            position={{ base: "relative", lg: "sticky" }}
            top={{ lg: "90px" }}
            bg="white"
            border="1px solid"
            borderColor="warmGray.200"
            borderRadius="md"
            boxShadow="0 2px 16px rgba(92, 71, 41, 0.08)"
            p={{ base: 2, md: 3 }}
          >
            <BookReader
              path={book.path}
              pageNumber={pageNumber}
              numPages={numPages}
              onLoadSuccess={onDocumentLoadSuccess}
              onPageChange={onPageChange}
            />
          </Box>

          {/* Book Details */}
          <Box flex={1} minW={0}>
            <Text
              fontFamily="heading"
              fontWeight="600"
              fontSize="2xl"
              color="brand.800"
              mb={4}
              as="h2"
            >
              R&eacute;sum&eacute;
            </Text>
            <Box
              dangerouslySetInnerHTML={{ __html: xss(book.summary) }}
              sx={{
                "& p, & br + br": { mb: 3 },
                fontSize: "md",
                lineHeight: "tall",
                color: "warmGray.700",
              }}
            />

            <Box width="40px" height="1px" bg="brand.300" my={6} />

            <Text
              fontFamily="heading"
              fontWeight="600"
              fontSize="2xl"
              color="brand.800"
              mb={4}
              as="h2"
            >
              Note
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: xss(book.additionalInformation),
              }}
              sx={{
                "& em": { color: "warmGray.600" },
                "& a": { color: "brand.600", textDecoration: "underline" },
                fontSize: "md",
                lineHeight: "tall",
                color: "warmGray.700",
              }}
            />
          </Box>
        </Box>

        {/* ─── Press section ─── */}
        <Box mb={8}>
          <Box textAlign="center" mb={8}>
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "2xl", md: "3xl" }}
              color="brand.800"
            >
              Presse
            </Text>
            <Box width="40px" height="1px" bg="brand.400" mx="auto" mt={3} />
          </Box>

          {book.images.length > 1 && (
            <Box
              display="flex"
              gap={4}
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedItem(selectedItem - 1)}
                aria-label="Article pr&eacute;c&eacute;dent"
              >
                <ArrowLeftIcon mr={2} />
                Pr&eacute;c&eacute;dent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedItem(selectedItem + 1)}
                aria-label="Article suivant"
              >
                Suivant
                <ArrowRightIcon ml={2} />
              </Button>
            </Box>
          )}
          <Box maxWidth="800px" mx="auto">
            <Carousel
              ariaLabel="Carousel d'images de presse"
              infiniteLoop={true}
              autoPlay={false}
              onChange={v => setSelectedItem(v)}
              selectedItem={selectedItem}
              showThumbs={false}
            >
              {book.images.map((img) => (
                <div key={img.source} style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                  <Image
                    src={img.source}
                    alt={img.alt}
                    width={768}
                    height={1086}
                    style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "80vh" }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: Book1998.key } },
      { params: { id: Book1992.key } },
      { params: { id: Book2017.key } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let book: Book;
  switch (context.params?.id) {
    case Book1998.key:
      book = Book1998;
      break;
    case Book1992.key:
      book = Book1992;
      break;
    case Book2017.key:
      book = Book2017;
      break;
    default:
      return {
        notFound: true,
      };
  }
  return {
    props: { book },
  };
}

export default Page;

import { useRef, useState } from "react";
import {
  Button,
  Box,
  Stack,
  Link,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Image from "next/image";
import xss from "xss";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import type { GetStaticPropsContext, NextPage } from "next";
import { Layout } from "../../src/components/layout";
import { useDimensions } from "../../src/hooks/useDimensions";
import { SEO } from "../../src/components/seo";
import { BASE_URL } from "../../src/config";
import { Book, Book1992, Book1998, Book2017 } from "../../src/data";
import { PERSON_ID, WEBSITE_ID, breadcrumbSchema, entityToSchema } from "../../src/utils/jsonld";
import PDFViewer from "../../src/components/pdf";

const Page: NextPage<{ book: Book }> = ({ book }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [sliderValue, setSliderValue] = useState<string | number>("1");
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const size = useDimensions(targetRef);
  const plainDescription = book.summary
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onGoBack = () => {
    const newValue = pageNumber - 1;
    if (pageNumber > 1) {
      setPageNumber(newValue);
      setSliderValue(String(newValue));
    }
  };

  const onGoNext = () => {
    const newValue = pageNumber + 1;
    if (pageNumber < numPages) {
      setPageNumber(newValue);
      setSliderValue(String(newValue));
    }
  };

  const onInputChange = (value: string | number) => {
    setSliderValue(value);
    const parseValue = typeof value === "string" ? parseInt(value, 10) : value;
    if (parseValue > 0 && parseValue <= numPages) {
      setPageNumber(parseValue);
    }
  };

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
        <Box display="flex" flexDirection={{ base: "column", lg: "row" }}>
          <Box
            ref={targetRef}
            flex={1}
            display="flex"
            justifyContent="center"
            maxWidth={{ base: "90vw", lg: "45vw" }}
            marginRight="2rem"
          >
            <PDFViewer
              height={size.height}
              width={size.width}
              path={book.path}
              pageNumber={pageNumber}
              onLoadSuccess={onDocumentLoadSuccess}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
          >
            <Text
              as="h1"
              fontFamily="Oooh Baby"
              fontWeight="600"
              fontSize="4xl"
            >
              {book.title}
            </Text>
            <Text
              fontFamily="Oooh Baby"
              fontWeight="600"
              fontSize="3xl"
              alignSelf="flex-start"
              marginTop="2rem"
              as="h2"
            >
              Résumé
            </Text>
            <Box
              dangerouslySetInnerHTML={{ __html: xss(book.summary) }}
              marginTop="1rem"
            />
            <Text
              fontFamily="Oooh Baby"
              fontWeight="600"
              fontSize="3xl"
              alignSelf="flex-start"
              marginTop="2rem"
              as="h2"
            >
              Note
            </Text>
            <Box
              dangerouslySetInnerHTML={{
                __html: xss(book.additionalInformation),
              }}
              alignSelf="flex-start"
              marginTop="1rem"
            />

            <Link href={book.path} isExternal marginTop="2rem">
              Ouvrir ou télécharger le livre
              <ExternalLinkIcon mx="5px" />
            </Link>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              marginTop="2rem"
            >
              <NumberInput
                defaultValue={1}
                min={1}
                max={numPages}
                value={sliderValue}
                onChange={onInputChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Text marginLeft={5}>
                Page {pageNumber} sur {numPages}
              </Text>
            </Box>

            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              justifyContent="center"
              marginTop="2rem"
            >
              <Button
                leftIcon={<ArrowLeftIcon />}
                variant="solid"
                onClick={onGoBack}
                name="Page précédente"
                aria-label="Page précédente"
              >
                Page précédente
              </Button>
              <Button
                rightIcon={<ArrowRightIcon />}
                variant="solid"
                onClick={onGoNext}
                name="Page suivante"
                aria-label="Page suivante"
              >
                Page suivante
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          marginTop="2rem"
        >
          <Text
            as="h2"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="4xl"
            textAlign="center"
          >
            Presse
          </Text>

          {book.images.length > 1 && (
            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              justifyContent="center"
              marginTop="2rem"
            >
              <Button
                leftIcon={<ArrowLeftIcon />}
                variant="solid"
                onClick={() => setSelectedItem(selectedItem - 1)}
                name="Article précédent"
                aria-label="Article précédent"
              >
                Article précédent
              </Button>
              <Button
                rightIcon={<ArrowRightIcon />}
                variant="solid"
                onClick={() => setSelectedItem(selectedItem + 1)}
                name="Article suivant"
                aria-label="Article suivant"
              >
                Article suivant
              </Button>
            </Stack>
          )}
          <Box
            width={{ base: "100%", md: "80vw", lg: "60vw" }}
            height="auto"
            alignSelf="center"
            marginTop="1rem"
          >
            <Carousel
              ariaLabel="Carousel d'images"
              infiniteLoop={true}
              autoPlay={false}
              onChange={v => setSelectedItem(v)}
              selectedItem={selectedItem}
              showThumbs={false}
            >
              {book.images.map((img, index) => (
                <div key={index} style={{ position: "relative", width: "100%", aspectRatio: "210/297" }}>
                  <Image
                    src={img.source}
                    alt={img.alt}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
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

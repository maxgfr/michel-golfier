import React, { useRef, useState } from "react";
import Head from "next/head";
import { Button } from "@chakra-ui/button";
import { Box, Stack, Link, Text } from "@chakra-ui/layout";
import xss from "xss";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import type { GetServerSidePropsContext, NextPage } from "next";
import { Document, Page as Pdf, pdfjs } from "react-pdf";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input";
import { Layout } from "../../src/components/layout";
import { useDimensions } from "../../src/hooks/useDimensions";
import { NextSeo } from "next-seo";
import { BASE_URL } from "../../src/config";
import { Book, Book1992, Book1998, Book2017 } from "../../src/data";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Page: NextPage<{ book: Book }> = ({ book }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [sliderValue, setSliderValue] = useState<string | number>("1");
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const size = useDimensions(targetRef);

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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebPage",
              mainEntity: {
                "@type": "Book",
                author: "http://www.example.com/author.html",
                bookFormat: "http://schema.org/EBook",
                datePublished: book.datePublished,
                image: `${BASE_URL}${book.cover.source}`,
                inLanguage: "fr-FR",
                isbn: book.isbn,
                name: book.title,
                numberOfPages: book.numberOfPages,
                ...(book.price
                  ? {
                      offers: {
                        "@type": "Offer",
                        availability: "http://schema.org/InStock",
                        price: book.price,
                        priceCurrency: "EUR",
                      },
                    }
                  : {}),
                publisher: "Michel Golfier",
              },
            }),
          }}
        />
      </Head>
      <NextSeo
        title={`Michel Golfier | ${book.title}`}
        description={book.summary}
        canonical={`${BASE_URL}/${book.key}`}
        openGraph={{
          url: `${BASE_URL}/${book.key}`,
          title: `Michel Golfier | ${book.title}`,
          description: book.summary,
          images: [...book.images, book.cover].map(img => ({
            alt: img.alt,
            url: `${BASE_URL}${img.source}`,
            type: "image/jpeg",
          })),
          type: "book",
          book: {
            releaseDate: book.datePublished,
            isbn: book.isbn,
            tags: book.tags,
          },
          site_name: "Michel Golfier",
          locale: "fr_FR",
        }}
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
            <Document file={book.path} onLoadSuccess={onDocumentLoadSuccess}>
              <Pdf
                pageNumber={pageNumber}
                width={size.width}
                height={size.height}
              />
            </Document>
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
              >
                Page précédente
              </Button>
              <Button
                rightIcon={<ArrowRightIcon />}
                variant="solid"
                onClick={onGoNext}
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
              >
                Article précédent
              </Button>
              <Button
                rightIcon={<ArrowRightIcon />}
                variant="solid"
                onClick={() => setSelectedItem(selectedItem + 1)}
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
            >
              {book.images.map((img, index) => (
                <Image
                  key={index}
                  src={img.source}
                  alt={img.alt}
                  layout="responsive"
                  width="100%"
                  height="100%"
                />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let book: Book;
  switch (context.query.book) {
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

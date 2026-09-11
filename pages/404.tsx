import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Text } from "@chakra-ui/react";
import { Layout } from "../src/components/layout";
import { SEO } from "../src/components/seo";

const Page: NextPage = () => {
  return (
    <>
      <SEO
        title="Michel Golfier | Page introuvable"
        description="Cette page n'existe pas ou a été déplacée."
        noIndex
      />
      <Layout>
        <Box textAlign="center" maxW="650px" mx="auto" py={{ base: 10, md: 16 }}>
          <Text
            fontFamily="heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="700"
            color="brand.300"
            fontStyle="italic"
          >
            404
          </Text>
          <Text
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color="brand.800"
            mt={2}
          >
            Page introuvable
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center" my={6}>
            <Box flex={1} maxW="80px" h="1px" bg="brand.300" />
            <Text mx={4} color="brand.400" fontSize="lg">&#9671;</Text>
            <Box flex={1} maxW="80px" h="1px" bg="brand.300" />
          </Box>
          <Text fontSize="md" lineHeight="tall" color="warmGray.700">
            La page que vous cherchez n&rsquo;existe pas ou a &eacute;t&eacute;
            d&eacute;plac&eacute;e. Vous pouvez revenir &agrave; l&rsquo;accueil pour
            retrouver mes ouvrages.
          </Text>
          <Button as={NextLink} href="/" mt={8}>
            Retour &agrave; l&rsquo;accueil
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default Page;

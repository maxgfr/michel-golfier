import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Stack, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Book1992, Book1998, Book2017 } from "../data";

const books = [Book1992, Book1998, Book2017];

export const FooterHeight = "auto";

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      backgroundColor="gray.50"
      borderTopWidth={1}
      paddingY={8}
      marginTop={12}
    >
      <Box
        maxWidth="1200px"
        margin="0 auto"
        paddingX={4}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          justify="space-between"
          align="start"
        >
          {/* Colonne 1 - À propos */}
          <VStack align="start" spacing={3} flex={1}>
            <Text as="h3" fontWeight="600" fontSize="lg" color="gray.800">
              Michel Golfier
            </Text>
            <Text fontSize="sm" color="gray.600" maxWidth="250px">
              Auteur auvergnat spécialisé dans l'histoire locale et le patrimoine de la région Auvergne-Rhône-Alpes.
            </Text>
          </VStack>

          {/* Colonne 2 - Ouvrages */}
          <VStack align="start" spacing={3} flex={1}>
            <Text as="h3" fontWeight="600" fontSize="lg" color="gray.800">
              Ouvrages
            </Text>
            <VStack align="start" spacing={2}>
              {books.map((book) => (
                <NextLink key={book.key} href={`/ouvrages/${book.key}`}>
                  <Link fontSize="sm" color="gray.600" _hover={{ color: "blue.500" }}>
                    {book.title}
                  </Link>
                </NextLink>
              ))}
            </VStack>
          </VStack>

          {/* Colonne 3 - Navigation */}
          <VStack align="start" spacing={3} flex={1}>
            <Text as="h3" fontWeight="600" fontSize="lg" color="gray.800">
              Navigation
            </Text>
            <VStack align="start" spacing={2}>
              <NextLink href="/">
                <Link fontSize="sm" color="gray.600" _hover={{ color: "blue.500" }}>
                  Accueil
                </Link>
              </NextLink>
              <NextLink href="/biographie">
                <Link fontSize="sm" color="gray.600" _hover={{ color: "blue.500" }}>
                  Biographie
                </Link>
              </NextLink>
              <NextLink href="/contact">
                <Link fontSize="sm" color="gray.600" _hover={{ color: "blue.500" }}>
                  Contact
                </Link>
              </NextLink>
            </VStack>
          </VStack>

          {/* Colonne 4 - Liens utiles */}
          <VStack align="start" spacing={3} flex={1}>
            <Text as="h3" fontWeight="600" fontSize="lg" color="gray.800">
              Liens utiles
            </Text>
            <VStack align="start" spacing={2}>
              <Link
                href="https://www.auvergnerhonealpes.fr/"
                isExternal
                fontSize="sm"
                color="gray.600"
                _hover={{ color: "blue.500" }}
              >
                Région Auvergne-Rhône-Alpes <ExternalLinkIcon mx="2px" />
              </Link>
              <Link
                href="https://www.puy-de-dome.fr/"
                isExternal
                fontSize="sm"
                color="gray.600"
                _hover={{ color: "blue.500" }}
              >
                Puy-de-Dôme <ExternalLinkIcon mx="2px" />
              </Link>
              <Link
                href="https://www.clermont-auvergne.fr/"
                isExternal
                fontSize="sm"
                color="gray.600"
                _hover={{ color: "blue.500" }}
              >
                Clermont Auvergne Tourisme <ExternalLinkIcon mx="2px" />
              </Link>
            </VStack>
          </VStack>
        </Stack>

        {/* Barre inférieure */}
        <Box
          borderTopWidth={1}
          marginTop={8}
          paddingTop={6}
          textAlign="center"
        >
          <VStack spacing={3}>
            <Text fontSize="sm" color="gray.500">
              © {currentYear} Michel Golfier. Tous droits réservés.
            </Text>
            <HStack spacing={4} fontSize="sm" color="gray.500">
              <Link
                href="https://github.com/maxgfr/michel-golfier"
                isExternal
                color="gray.500"
                _hover={{ color: "blue.500" }}
              >
                Code source du site <ExternalLinkIcon mx="2px" />
              </Link>
              <Text>•</Text>
              <Text>Fait avec passion en Auvergne</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

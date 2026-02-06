import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

export const FooterHeight = "6rem";

export function Footer(): React.JSX.Element {
  return (
    <Box
      as="footer"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderTopWidth={1}
      borderColor="warmGray.200"
      height={FooterHeight}
      bg="parchment.100"
      gap={1}
    >
      <Text fontSize="sm" color="warmGray.500" fontStyle="italic">
        &copy; Michel Golfier &mdash; Auteur auvergnat
      </Text>
      <Link
        href="https://github.com/maxgfr/michel-golfier"
        target="_blank"
        rel="noopener noreferrer"
        fontSize="xs"
        color="warmGray.400"
        _hover={{ color: "brand.600" }}
      >
        Code source <ExternalLinkIcon mx="2px" />
      </Link>
    </Box>
  );
}

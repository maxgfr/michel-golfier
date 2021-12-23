import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Text, Link } from "@chakra-ui/react";
import React from "react";

export const FooterHeight = "4rem";

export function Footer(): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderTopWidth={1}
      height={FooterHeight}
    >
      <Link href="https://github.com/maxgfr/michel-golfier" isExternal>
        Code source du site <ExternalLinkIcon mx="2px" />
      </Link>
    </Box>
  );
}

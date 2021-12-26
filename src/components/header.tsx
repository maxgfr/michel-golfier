import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Link,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

type Links = {
  href: string;
  label: string;
};

type Props = {
  title: string;
  links: Links[];
};

export const HeaderHeight = "4rem";

export function Header({ title, links }: Props): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="2xl">Menu</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column">
            {links.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref>
                <Link fontSize="xl" marginY={2}>
                  {label}
                </Link>
              </NextLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box
        position="relative"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        height={HeaderHeight}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginLeft={4}
        >
          <Text
            as="a"
            href="/"
            fontFamily="Oooh Baby"
            fontWeight="600"
            fontSize="4xl"
          >
            {title}
          </Text>
        </Box>
        <Box
          display={{ base: "none", lg: "initial" }}
          position="absolute"
          transform="translate(-50%, -50%)"
          left="50%"
          top="50%"
        >
          {links.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link fontSize="xl" marginX={2}>
                {label}
              </Link>
            </NextLink>
          ))}
        </Box>
        <Box
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
          justifyContent="center"
          marginRight={4}
        >
          <Button ref={btnRef} onClick={onOpen} name="Menu" aria-label="Menu">
            <HamburgerIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
}

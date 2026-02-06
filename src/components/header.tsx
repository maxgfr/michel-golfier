import { HamburgerIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type Links = {
  href: string;
  label: string;
  isExternal?: boolean;
};

type Props = {
  title: string;
  links: Links[];
};

export const HeaderHeight = "5rem";

export function Header({ title, links }: Props): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay bg="blackAlpha.300" />
        <DrawerContent bg="parchment.50">
          <DrawerCloseButton />
          <DrawerHeader
            fontFamily="heading"
            fontSize="2xl"
            fontWeight="600"
            color="brand.800"
            borderBottomWidth={1}
            borderColor="warmGray.200"
          >
            Menu
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" pt={6}>
            {links.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <Link
                  key={href}
                  as={NextLink}
                  href={href}
                  fontSize="xl"
                  fontFamily="heading"
                  marginY={3}
                  fontWeight={isActive ? "700" : "400"}
                  color={isActive ? "brand.700" : "warmGray.700"}
                  onClick={onClose}
                  _hover={{ color: "brand.600", textDecoration: "none" }}
                  letterSpacing="0.02em"
                >
                  {label}
                </Link>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Header bar */}
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={10}
        bg="parchment.50"
        borderBottom="1px solid"
        borderColor="warmGray.200"
        height={HeaderHeight}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={6}
      >
        {/* Title — left on desktop, centered overall */}
        <Box position="absolute" left={6} display="flex" alignItems="center">
          <Link
            as={NextLink}
            href="/"
            _hover={{ textDecoration: "none", color: "brand.600" }}
          >
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: "xl", md: "2xl" }}
              color="brand.800"
              letterSpacing="0.03em"
              fontStyle="italic"
            >
              {title}
            </Text>
          </Link>
        </Box>

        {/* Nav links — center */}
        <Box display={{ base: "none", lg: "flex" }} gap={8} alignItems="center">
          {links.map(({ href, label, isExternal }) => {
            const isActive = router.pathname === href;
            return (
              <Link
                key={href}
                as={NextLink}
                href={href}
                fontFamily="heading"
                fontSize="lg"
                fontWeight={isActive ? "700" : "400"}
                color={isActive ? "brand.700" : "warmGray.600"}
                letterSpacing="0.05em"
                textTransform="uppercase"
                position="relative"
                _hover={{
                  color: "brand.600",
                  textDecoration: "none",
                }}
                _after={isActive ? {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "25%",
                  right: "25%",
                  height: "1px",
                  bg: "brand.500",
                } : undefined}
              >
                {label}
                {isExternal && <ExternalLinkIcon ml="6px" fontSize="sm" />}
              </Link>
            );
          })}
        </Box>

        {/* Hamburger — right */}
        <Box position="absolute" right={6} display={{ base: "flex", lg: "none" }}>
          <Button
            ref={btnRef}
            onClick={onOpen}
            variant="ghost"
            name="Menu"
            aria-label="Menu"
            color="brand.700"
          >
            <HamburgerIcon boxSize={5} />
          </Button>
        </Box>
      </Box>
    </>
  );
}

import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import type { ElementType, ReactElement } from "react";

type Props = {
  summary: Array<string>;
  title: string;
  isReverse?: boolean;
  image?: string;
  wrapperProps?: Record<string, any>;
  href?: string;
  titleAs?: ElementType | undefined;
};

export function Book({
  summary,
  title,
  image,
  wrapperProps,
  isReverse = false,
  href,
  titleAs,
}: Props): ReactElement {
  const content = (
    <Box
      display="flex"
      flexDirection={{
        base: "column",
        md: isReverse ? "row-reverse" : "row",
      }}
      bg="white"
      borderRadius="sm"
      border="1px solid"
      borderColor="warmGray.200"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={href ? {
        shadow: "lg",
        borderColor: "brand.300",
        transform: "translateY(-3px)",
      } : undefined}
      cursor={href ? "pointer" : "default"}
      {...wrapperProps}
    >
      {image && (
        <Box
          flexShrink={0}
          position="relative"
          bg="parchment.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={6}
          width={{ base: "100%", md: "280px" }}
        >
          <Image
            src={image}
            alt={title}
            width={220}
            height={311}
            style={{
              objectFit: "contain",
              maxWidth: "220px",
              height: "auto",
              boxShadow: "4px 4px 15px rgba(0,0,0,0.2)",
            }}
          />
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        p={{ base: 5, md: 8 }}
        flex={1}
      >
        <Text
          as={titleAs ?? "p"}
          fontFamily="heading"
          fontWeight="700"
          fontSize={{ base: "xl", md: "2xl" }}
          lineHeight="shorter"
          mb={4}
          color="brand.800"
          fontStyle="italic"
        >
          {title}
        </Text>
        {/* Decorative divider */}
        <Box
          width="50px"
          height="1px"
          bg="brand.400"
          mb={4}
        />
        {summary.map((line, i) => (
          <Text
            key={`summary-${i}`}
            mt={i > 0 ? 3 : 0}
            fontSize="md"
            lineHeight="tall"
            color="warmGray.700"
          >
            {line}
          </Text>
        ))}
      </Box>
    </Box>
  );

  if (href) {
    return (
      <NextLink href={href} style={{ textDecoration: "none", display: "block" }}>
        {content}
      </NextLink>
    );
  }

  return content;
}

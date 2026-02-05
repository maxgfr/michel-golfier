import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { ElementType } from "react";

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
}: Props): JSX.Element {
  return (
    <Box
      as={href ? "a" : "div"}
      display="flex"
      flexDirection={{
        base: "column-reverse",
        md: isReverse ? "row-reverse" : "row",
      }}
      backgroundColor="#faf9f9"
      borderRadius={10}
      padding={5}
      {...(href ? { href } : {})}
      {...wrapperProps}
    >
      {image && (
        <Box
          marginTop={{ base: 4, md: 0 }}
          marginRight={{ md: 4 }}
          position="relative"
          minWidth={{ base: "100px", sm: "200px", md: "300px" }}
          aspectRatio={210 / 297}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 200px, 300px"
          />
        </Box>
      )}
      <Box display="flex" flexDirection="column">
        <Text
          as={titleAs ?? "p"}
          fontFamily="Oooh Baby"
          fontWeight="600"
          fontSize="4xl"
        >
          {title}
        </Text>
        {summary.map((line, i) => (
          <Text key={i} marginTop={4}>
            {line}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

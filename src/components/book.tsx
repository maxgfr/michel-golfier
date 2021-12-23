import { Box, Text, Img, AspectRatio, As } from "@chakra-ui/react";

type Props = {
  summary: string;
  title: string;
  isReverse?: boolean;
  image?: string;
  wrapperProps?: Record<string, any>;
  href?: string;
  titleAs?: As<any> | undefined;
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
        <Box marginTop={{ base: 4, md: 0 }}>
          <AspectRatio
            minWidth={{ base: "100px", sm: "200px", md: "300px" }}
            marginRight={4}
            ratio={210 / 297}
          >
            <Img src={image} alt={title} objectFit="cover" />
          </AspectRatio>
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
        <Text marginTop={4}>{summary}</Text>
      </Box>
    </Box>
  );
}

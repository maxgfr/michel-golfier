import { Box, Text, Image } from "@chakra-ui/react";

type Props = {
  summary: string;
  title: string;
  image?: string;
};
export function Book({ summary, title, image }: Props): JSX.Element {
  return (
    <Box>
      <Text fontFamily="Oooh Baby" fontWeight="600" fontSize="4xl">
        {title}
      </Text>
      <Text>{summary}</Text>
      {image && <Image src={image} alt={title} />}
    </Box>
  );
}

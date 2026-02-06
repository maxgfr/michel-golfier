import { Box } from "@chakra-ui/react";
import { FooterHeight } from "./footer";
import { HeaderHeight } from "./header";

type Props = {
  children: React.ReactNode;
  wrapperProps?: Record<string, any>;
};

export function Layout({ children, wrapperProps }: Props): React.JSX.Element {
  return (
    <Box
      as="main"
      maxWidth="1100px"
      mx="auto"
      px={{ base: 5, md: 10 }}
      py={{ base: 8, md: 12 }}
      minHeight={`calc(100vh - ${FooterHeight} - ${HeaderHeight})`}
      {...wrapperProps}
    >
      {children}
    </Box>
  );
}

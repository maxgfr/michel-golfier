import { Box } from "@chakra-ui/react";
import { FooterHeight } from "./footer";
import { HeaderHeight } from "./header";

type Props = {
  children: React.ReactNode;
  wrapperProps?: Record<string, any>;
};

export function Layout({ children, wrapperProps }: Props): JSX.Element {
  return (
    <Box
      padding={10}
      minHeight={`calc(100vh - ${FooterHeight} - ${HeaderHeight})`}
      {...wrapperProps}
    >
      {children}
    </Box>
  );
}

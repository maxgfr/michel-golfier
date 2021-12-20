import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  wrapperProps?: Record<string, any>;
};

export function Layout({ children, wrapperProps }: Props): JSX.Element {
  return (
    <Box margin={10} {...wrapperProps}>
      {children}
    </Box>
  );
}

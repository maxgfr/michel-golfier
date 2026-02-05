import "../styles/globals.css";
import theme from "../src/themes/chakra";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../src/components/header";
import { Footer } from "../src/components/footer";
import { Insights } from "../src/components/analytics";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header
        links={[
          { href: "/biographie", label: "Biographie" },
          { href: "/contact", label: "Contact" },
        ]}
        title="Michel Golfier"
      />
      <Component {...pageProps} />
      <Insights />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;

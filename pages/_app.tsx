import "../styles/globals.css";
import theme from "../src/themes/chakra";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../src/components/header";
import { Footer } from "../src/components/footer";
import { Insights } from "../src/components/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Header
        links={[
          { href: "/biographie", label: "Biographie" },
          { href: "/contact", label: "Contact" },
        ]}
        title="Michel Golfier"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Insights />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;

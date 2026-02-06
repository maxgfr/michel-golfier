import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import React, { ReactElement } from "react";
import { crimsonText, playfairDisplay } from "../src/fonts";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): ReactElement {
    return (
      <Html lang="fr-FR" className={`${playfairDisplay.variable} ${crimsonText.variable}`}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import React, { ReactElement } from "react";
import { balooBhaijaan, ooohBaby } from "../src/fonts";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): ReactElement {
    return (
      <Html lang="fr-FR" className={`${balooBhaijaan.variable} ${ooohBaby.variable}`}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

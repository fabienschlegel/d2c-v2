import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import mainTheme from "core/mainTheme";

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": false}] */
import "prismjs/themes/prism-tomorrow.css";

import "styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={mainTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

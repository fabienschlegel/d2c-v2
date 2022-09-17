import { useEffect } from "react";

import type { AppProps } from "next/app";

import { useRouter } from "next/router";

import * as gtag from "core/gtag";

import { ChakraProvider } from "@chakra-ui/react";

import mainTheme from "core/mainTheme";

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": false}] */
import "prismjs/themes/prism-tomorrow.css";

const isProduction = process.env.NODE_ENV === "production";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ChakraProvider theme={mainTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;

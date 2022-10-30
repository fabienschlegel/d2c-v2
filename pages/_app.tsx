import { useEffect } from 'react';

import type { AppProps } from 'next/app';

import { useRouter } from 'next/router';

import { isProduction } from 'core';

import { GoogleAnalyticsScripts, gtagPageview } from 'features/Metrics';

import { ChakraProvider } from '@chakra-ui/react';

import mainTheme from 'core/mainTheme';

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": false}] */
import 'prismjs/themes/prism-tomorrow.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtagPageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {isProduction && <GoogleAnalyticsScripts />}
      <ChakraProvider theme={mainTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;

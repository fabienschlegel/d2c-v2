import { extendTheme } from '@chakra-ui/react';

const mainTheme = extendTheme({
  colors: {
    brand: {
      darkBlue: '#1f4f6f',
      blue: '#22577a',
      greenBlue: '#38a3a5',
      greener: '#57cc99',
      green: '#80ED99',
      lightGreen: '#c7f9cc',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Libre Baskerville', sans-serif`,
  },
});

export default mainTheme;

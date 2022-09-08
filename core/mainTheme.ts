import { extendTheme } from "@chakra-ui/react";

const mainTheme = extendTheme({
  colors: {
    darkBlue: "#1f4f6f",
    greenBlue: "#38a3a5",
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Libre Baskerville', sans-serif`,
  },
});

export default mainTheme;

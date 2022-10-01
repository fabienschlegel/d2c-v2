import type { NextPage } from "next";

import { Box, Heading, Text } from "@chakra-ui/react";

import { Layout } from "features/Layout";

import { SITE_DESCRIPTION } from "core/constants";

const pageName = "About Me";

const About: NextPage = () => {
  return (
    <Layout
      title={pageName}
      metaDescription={`${pageName} - ${SITE_DESCRIPTION}`}
    >
      <Box
        width="100%"
        maxWidth={{ md: "660px", lg: "800px" }}
        padding={5}
        margin="0 auto 20px"
      >
        <Heading>About me</Heading>
        <Text marginTop="1em">
          Hi, my name is Fabien. I&apos;m a french web developper and I work
          with Javascript, Typescript and Python.
        </Text>
        <Text marginTop="1em">
          First of all, thank you for reading my blog. I create it to share my
          knowledges with everyone.
        </Text>
        <Text marginTop="1em">
          If you like my content, you can share it or follow me on Twitter.
        </Text>
      </Box>
    </Layout>
  );
};

export default About;

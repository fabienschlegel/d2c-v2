import type { NextPage } from 'next';

import { Box, Heading, Text } from '@chakra-ui/react';

import { PrimaryLayout } from 'features/Layout';

import { SITE_DESCRIPTION, SITE_IMAGE } from 'core/constants';

const pageName = 'About Me';

const About: NextPage = () => {
  return (
    <PrimaryLayout
      pageTitle={pageName}
      pageMetaDescription={`${pageName} - ${SITE_DESCRIPTION}`}
      pageImagePath={SITE_IMAGE}
    >
      <Box width="100%" maxWidth={{ md: '660px', lg: '800px' }} padding={5} margin="0 auto 20px">
        <Heading>About me</Heading>
        <Text marginTop="1em">
          Hi, my name is Fabien. I&apos;m a french web developper and I work with Javascript,
          Typescript and Python.
        </Text>
        <Text marginTop="1em">
          First of all, thank you for reading my blog. I created it to share my knowledge with
          everyone.
        </Text>
        <Text marginTop="1em">
          If you like my content, you can share it or follow me on Twitter.
        </Text>
      </Box>
    </PrimaryLayout>
  );
};

export default About;

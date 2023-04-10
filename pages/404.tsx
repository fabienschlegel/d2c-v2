import type { NextPage } from 'next';

import { Flex, Heading } from '@chakra-ui/react';

import { PrimaryLayout } from 'features/Layout';

import { ButtonLink } from 'features/Posts/components';

import { SITE_DESCRIPTION, SITE_IMAGE } from 'core/constants';

const FourZeroFour: NextPage = () => {
  return (
    <PrimaryLayout
      pageTitle="404 - It seems you're lost on Devoreur 2 Code"
      pageMetaDescription={`${SITE_DESCRIPTION} - Improve your development skills. Discover tips and advice from an experienced developer but now you're lost.`}
      pageImagePath={SITE_IMAGE}
    >
      <Flex
        width="100%"
        flex={1}
        align="center"
        justify="center"
        backgroundColor="brand.darkBlue"
        direction="column"
      >
        <Heading mb={8} size={{ base: '2xl', lg: '3xl' }} color="white">
          404
        </Heading>
        <Heading mb={8} size={{ base: '2xl', lg: '3xl' }} color="brand.green">
          {"It seems you're lost"}
        </Heading>
        <ButtonLink href="/" label="Back to home" />
      </Flex>
    </PrimaryLayout>
  );
};

export default FourZeroFour;

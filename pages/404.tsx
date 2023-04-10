import type { NextPage } from 'next';

import { Flex, Heading } from '@chakra-ui/react';

import { getAllPostsByDate } from 'features/Posts/api';

import { PrimaryLayout } from 'features/Layout';

import { HomeLastPosts } from 'features/HomePage';

import { PostSummary } from 'features/Posts/types';

import { SITE_DESCRIPTION, SITE_IMAGE } from 'core/constants';
import { POST_HEADER_FIELDS } from 'features/Posts';

interface HomeProps {
  lastPosts: Array<PostSummary>;
}

const FourZeroFour: NextPage<HomeProps> = ({ lastPosts }) => {
  return (
    <PrimaryLayout
      pageTitle="404 - It seems you're lost on Devoreur 2 Code"
      pageMetaDescription={`${SITE_DESCRIPTION} - Improve your development skills. Discover tips and advice from an experienced developer but now you're lost.`}
      pageImagePath={SITE_IMAGE}
    >
      <Flex
        width="100%"
        align="center"
        justify="space-evenly"
        backgroundColor="brand.darkBlue"
        direction="column"
      >
        <Heading mt={8} size={{ base: '2xl', lg: '3xl' }} color="white">
          {"It seems you're lost"}
        </Heading>
        <Heading mt={2} as="h3" size="lg" color="brand.green" textAlign="right">
          Take time to discover my last articles
        </Heading>
        <HomeLastPosts lastPosts={lastPosts} />
      </Flex>
    </PrimaryLayout>
  );
};

export default FourZeroFour;

export async function getStaticProps() {
  const lastPosts = getAllPostsByDate(POST_HEADER_FIELDS).slice(0, 3);

  return { props: { lastPosts } };
}

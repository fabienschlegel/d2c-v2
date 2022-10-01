import type { NextPage } from "next";

import { POST_HEADER_FIELDS } from "features/Posts";

import { getAllPostsByDate } from "features/Posts/api";

import { Layout } from "features/Layout";

import { Hero, HomeLastPosts } from "features/HomePage";

import { PostSummary } from "features/Posts/types";

interface HomeProps {
  lastPosts: Array<PostSummary>;
}

const Home: NextPage<HomeProps> = ({ lastPosts }) => {
  return (
    <Layout>
      <Hero />
      <HomeLastPosts lastPosts={lastPosts} />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const lastPosts = getAllPostsByDate(POST_HEADER_FIELDS).slice(0, 3);

  return {
    props: {
      lastPosts,
    },
  };
}

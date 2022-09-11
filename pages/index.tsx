import type { NextPage } from "next";

import { getAllPostsByDate } from "core/postsApi";

import { Hero, HomeLastPosts, Layout } from "components";

import { PostSummary } from "core/types";

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
  const lastPosts = getAllPostsByDate([
    "title",
    "date",
    "slug",
    "author",
    "excerpt",
    "coverImage",
    "tags",
  ]).slice(0, 3);

  return {
    props: {
      lastPosts,
    },
  };
}

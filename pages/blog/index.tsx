import type { NextPage } from "next";

import {
  POST_HEADER_FIELDS,
  PostsList,
  usePostsListNavigation,
} from "features/Posts";

import { getAllPostsByDate } from "features/Posts/api";

import { Layout } from "features/Layout";

import type { PostSummary } from "features/Posts/types";

interface BlogPageProps {
  posts: Array<PostSummary>;
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const { paginatedPosts, previous, next, previousPage, nextPage } =
    usePostsListNavigation(posts);
  return (
    <Layout title="List of blog posts">
      <PostsList>
        {paginatedPosts.map((post) => (
          <PostsList.Item
            key={post.slug}
            title={post.title}
            date={post.date}
            authorName={post.author.name}
            excerpt={post.excerpt}
            slug={`/blog/${post.slug}`}
            coverImage={post.coverImage}
            tags={post.tags}
          />
        ))}
        <PostsList.Navigation
          previous={previous}
          next={next}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </PostsList>
    </Layout>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const posts = getAllPostsByDate(POST_HEADER_FIELDS);

  return {
    props: {
      posts,
    },
  };
}

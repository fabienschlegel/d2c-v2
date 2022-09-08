import type { NextPage } from "next";

import { getAllPostsByDate } from "../../core/postsApi";

import { usePostsListNavigation } from "../../hooks";

import { Layout, PostsList } from "../../components";

import { PostSummary } from "../../core/types";

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
  const posts = getAllPostsByDate([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: {
      posts,
    },
  };
}

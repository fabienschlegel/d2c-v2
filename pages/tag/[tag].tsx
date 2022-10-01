import type { NextPage } from "next";

import {
  PostsList,
  POST_HEADER_FIELDS,
  usePostsListNavigation,
} from "features/Posts";

import { getAllTags, getPostsByTag } from "features/Posts/api";

import { Layout } from "features/Layout";

import { PostSummary } from "features/Posts/types";

interface TagPageProps {
  posts: Array<PostSummary>;
  tag: string;
}

const TagPage: NextPage<TagPageProps> = ({ posts, tag }) => {
  const { paginatedPosts, previous, next, previousPage, nextPage } =
    usePostsListNavigation(posts);
  return (
    <Layout title={`${tag} blog posts`}>
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

export default TagPage;

type Params = {
  params: {
    tag: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = getPostsByTag(params.tag, POST_HEADER_FIELDS);

  return {
    props: {
      posts,
      tag: params.tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = getAllTags();

  return {
    paths: tags.map((tag) => {
      return { params: { tag } };
    }),
    fallback: false,
  };
}

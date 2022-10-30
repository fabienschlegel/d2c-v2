import type { NextPage } from 'next';

import { POST_HEADER_FIELDS, PostsList, usePostsListNavigation } from 'features/Posts';

import { getAllPostsByDate } from 'features/Posts/api';

import { PrimaryLayout } from 'features/Layout';

import { SITE_NAME, SITE_IMAGE } from 'core/constants';

import type { PostSummary } from 'features/Posts/types';

interface BlogPageProps {
  posts: Array<PostSummary>;
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const { paginatedPosts, previous, next, previousPage, nextPage } = usePostsListNavigation(posts);
  return (
    <PrimaryLayout
      pageTitle="List of blog posts"
      pageMetaDescription={`List of posts from the blog ${SITE_NAME}`}
      pageImagePath={SITE_IMAGE}
    >
      <PostsList>
        {paginatedPosts.map((post) => (
          <PostsList.Item
            key={post.slug}
            title={post.title}
            date={post.date}
            authorName={post.author.name}
            excerpt={post.excerpt}
            readingTime={post.readingTime}
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
    </PrimaryLayout>
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

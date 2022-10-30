import type { NextPage } from 'next';

import { PostsList, POST_HEADER_FIELDS, usePostsListNavigation } from 'features/Posts';

import { getAllTags, getPostsByTag } from 'features/Posts/api';

import { PrimaryLayout } from 'features/Layout';

import { SITE_NAME, SITE_IMAGE } from 'core/constants';

import { PostSummary } from 'features/Posts/types';

interface TagPageProps {
  posts: Array<PostSummary>;
  tag: string;
}

const TagPage: NextPage<TagPageProps> = ({ posts, tag }) => {
  const { paginatedPosts, previous, next, previousPage, nextPage } = usePostsListNavigation(posts);
  return (
    <PrimaryLayout
      pageTitle={`${tag} blog posts`}
      pageMetaDescription={`Posts with the tag ${tag} from the blog ${SITE_NAME}`}
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

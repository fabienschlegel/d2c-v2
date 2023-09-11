import type { NextPage } from 'next';

import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { POST_HEADER_FIELDS, PostsList, usePostsListNavigation } from 'features/Posts';

import { getAllPostsByDateWithLocale } from 'features/Posts/api';

import { PrimaryLayout } from 'features/Layout';

import { SITE_NAME, SITE_IMAGE } from 'core/constants';

import type { PostSummary } from 'features/Posts/types';
import { Heading } from '@chakra-ui/react';

interface BlogPageProps {
  posts: Array<PostSummary>;
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const { t } = useTranslation('blog');
  const { paginatedPosts, previous, next, previousPage, nextPage } = usePostsListNavigation(posts);
  return (
    <PrimaryLayout
      pageTitle={t('pageTitle')}
      pageMetaDescription={t('pageMetaDescription', {
        siteName: SITE_NAME,
      })}
      pageImagePath={SITE_IMAGE}
    >
      <Heading mt={3}>{t('mostRecent')}</Heading>
      <PostsList>
        {paginatedPosts.map((post) => (
          <PostsList.Item
            key={post.slug}
            title={post.title}
            date={post.date}
            updated={post.updated}
            authorName={post.author.name}
            excerpt={post.excerpt}
            readingTime={post.readingTime}
            locale={post.locale}
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

type Params = {
  locale: string;
};

export async function getStaticProps({ locale }: Params) {
  const posts = getAllPostsByDateWithLocale(locale, POST_HEADER_FIELDS);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'posts', 'blog'])),
      posts,
    },
  };
}

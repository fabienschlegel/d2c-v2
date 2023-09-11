import type { NextPage } from 'next';

import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PostsList, POST_HEADER_FIELDS, usePostsListNavigation } from 'features/Posts';

import { getAllTagsWithLocales, getPostsByTagWithLocale } from 'features/Posts/api';

import { PrimaryLayout } from 'features/Layout';

import { SITE_NAME, SITE_IMAGE } from 'core/constants';

import { PostSummary } from 'features/Posts/types';
import { GetStaticPathsContext } from 'next/types';

interface TagPageProps {
  posts: Array<PostSummary>;
  tag: string;
}

const TagPage: NextPage<TagPageProps> = ({ posts, tag }) => {
  const { t } = useTranslation('tag');
  const { paginatedPosts, previous, next, previousPage, nextPage } = usePostsListNavigation(posts);
  return (
    <PrimaryLayout
      pageTitle={t('pageTitle', { tag })}
      pageMetaDescription={t('pageMetaDescription', { tag, siteName: SITE_NAME })}
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

export default TagPage;

type Params = {
  params: {
    tag: string;
  };
  locale: string;
};

export async function getStaticProps({ params, locale }: Params) {
  const posts = getPostsByTagWithLocale(params.tag, locale, POST_HEADER_FIELDS);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'tag'])),
      posts,
      tag: params.tag,
    },
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const tags = getAllTagsWithLocales(locales || []);

  return {
    paths: (locales || []).flatMap((locale) =>
      tags.map((tag) => ({
        params: {
          tag,
        },
        locale,
      }))
    ),
    fallback: false,
  };
}

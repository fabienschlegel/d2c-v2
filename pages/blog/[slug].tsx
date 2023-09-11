import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ErrorPage from 'next/error';

import { PrimaryLayout } from 'features/Layout';

import { POST_ALL_FIELDS, Post, POST_HEADER_FIELDS, SocialShare } from 'features/Posts';

import {
  getAllPostsByDate,
  getAlternateLanguageFromSlug,
  getNextPostWithLocale,
  getPostBySlug,
  getPreviousPostWithLocale,
} from 'features/Posts/api';

import markdownToHtml from 'core/utilities/markdownToHtml';

import { SITE_IMAGE } from 'core/constants';

import type { Alternates, IPost, PostAnchor, PostSummary } from 'features/Posts/types';

import { Hide } from '@chakra-ui/react';

import { GetStaticPathsContext } from 'next/types';

type Props = {
  post: IPost;
  previous: PostAnchor | null;
  next: PostAnchor | null;
  related: Array<PostSummary>;
  alternates: Alternates;
};

export default function PostPage({ post, previous, next, related, alternates }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PrimaryLayout
      pageTitle={post.pageTitle ? post.pageTitle : post.title}
      pageMetaDescription={post.excerpt}
      pageImagePath={post.coverImage || SITE_IMAGE}
      alternates={alternates}
    >
      <Post>
        <Post.Header
          title={post.title}
          authorName={post.author.name}
          date={post.date}
          updated={post.updated}
          readingTime={post.readingTime}
          locale={post.locale}
          coverImageSrc={post.coverImage}
          avatarSrc={post.author.avatar}
          tags={post.tags}
        />
        <Post.Content content={post.content} />
        {related.length > 0 ? (
          <Post.RelatedArticles relatedArticles={related} />
        ) : (
          <Post.Navigation
            previous={previous && { title: previous.title, href: previous.slug }}
            next={next && { title: next.title, href: next.slug }}
          />
        )}
      </Post>
      <Hide below="md">
        <SocialShare url={post.slug} title={post.title} />
      </Hide>
    </PrimaryLayout>
  );
}

type Params = {
  params: {
    slug: string;
  };
  locale: string;
};

export async function getStaticProps({ params, locale }: Params) {
  const post = getPostBySlug(params.slug, locale, POST_ALL_FIELDS);

  if (Object.keys(post).length === 0 && post.constructor === Object) return { notFound: true };

  const content = await markdownToHtml((post.content as string) || '');

  const previous = getPreviousPostWithLocale(params.slug, locale);
  const next = getNextPostWithLocale(params.slug, locale);

  const relatedSlugs = (post.related as Array<string>) || [];

  const related = relatedSlugs
    .slice(0, 2)
    .map((rs) => getPostBySlug(rs, locale, POST_HEADER_FIELDS))
    .filter((r) => Object.keys(r).length > 0);

  const alternates = getAlternateLanguageFromSlug(params.slug, locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'posts'])),
      post: {
        ...post,
        content,
      },
      previous,
      next,
      related,
      alternates,
    },
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const posts = getAllPostsByDate(locales || [], ['slug']);

  return {
    paths: (locales || []).flatMap((locale) =>
      posts.map((p) => ({
        params: {
          slug: p?.slug,
        },
        locale,
      }))
    ),
    fallback: false,
  };
}

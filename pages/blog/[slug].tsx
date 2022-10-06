import { useRouter } from "next/router";

import ErrorPage from "next/error";

import { PrimaryLayout } from "features/Layout";

import { POST_ALL_FIELDS, Post } from "features/Posts";

import {
  getAllPostsByDate,
  getNextPost,
  getPostBySlug,
  getPreviousPost,
} from "features/Posts/api";

import markdownToHtml from "core/utilities/markdownToHtml";

import { SITE_IMAGE } from "core/constants";

import type { IPost, PostAnchor } from "features/Posts/types";

type Props = {
  post: IPost;
  previous: PostAnchor | null;
  next: PostAnchor | null;
};

export default function PostPage({ post, previous, next }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PrimaryLayout
      pageTitle={post.title}
      pageMetaDescription={post.excerpt}
      pageImagePath={post.coverImage || SITE_IMAGE}
    >
      <Post>
        <Post.Header
          title={post.title}
          authorName={post.author.name}
          date={post.date}
          coverImageSrc={post.coverImage}
          avatarSrc={post.author.avatar}
          tags={post.tags}
        />
        <Post.Content content={post.content} />
        <Post.Navigation
          previous={previous && { title: previous.title, href: previous.slug }}
          next={next && { title: next.title, href: next.slug }}
        />
      </Post>
    </PrimaryLayout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, POST_ALL_FIELDS);

  const content = await markdownToHtml(post.content || "");

  const previous = getPreviousPost(params.slug);

  const next = getNextPost(params.slug);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      previous,
      next,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPostsByDate(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

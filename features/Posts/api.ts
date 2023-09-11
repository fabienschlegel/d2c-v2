import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import { lowercaseArrayOfStrings } from 'core';
import { Alternates, IPost } from './types';
import { readingTime } from 'core/helpers/textHelpers';

type Items = {
  [key: string]: string | Array<string>;
};

const postsDirectory = join(process.cwd(), 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostsSlugsWithLocale(locale: string) {
  return getPostSlugs()
    .map((s) => {
      const splitted = s.split('.');
      return {
        slug: splitted[0],
        locale: splitted[1],
      };
    })
    .filter((s) => s.locale === locale)
    .map((s) => s.slug);
}

export function getPostBySlug(slug: string, locale: string, fields: string[] = []) {
  const realSlugWithLocale = slug.replace(/\.md$/, '').split('.');
  const realSlug = realSlugWithLocale[0];

  const fullPath = join(postsDirectory, `${realSlug}.${locale}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const items: Items = {};

    items.locale = locale;

    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }

      if (field === 'readingTime') items[field] = `${readingTime(content)} min`;

      if (typeof data[field] !== 'undefined') {
        items[field] = data[field];
      }
    });

    return items;
  } catch (err) {
    return {};
  }
}

export function useUpdatedDate(post: Items) {
  return post.updated || post.date;
}

export function getAllPosts(locales: string[], fields: string[] = []) {
  return locales
    .map((locale) =>
      getPostsSlugsWithLocale(locale).map((slug) => getPostBySlug(slug, locale, fields))
    )
    .flat();
}

export function getAllPostsWithLocale(locale: string, fields: string[] = []) {
  const slugs = getPostsSlugsWithLocale(locale);
  return slugs.map((slug) => getPostBySlug(slug, locale, fields));
}

export function getAllPostsByDate(locales: string[], fields: string[] = []) {
  return getAllPosts(locales, fields).sort((post1, post2) =>
    useUpdatedDate(post1) > useUpdatedDate(post2) ? -1 : 1
  );
}

export function getAllPostsByDateWithLocale(locale: string, fields: string[] = []) {
  return getAllPostsWithLocale(locale, fields).sort((post1, post2) =>
    useUpdatedDate(post1) > useUpdatedDate(post2) ? -1 : 1
  );
}

export function getPostsByTagWithLocale(tag: string, locale: string, fields: string[] = []) {
  return getAllPostsByDateWithLocale(locale, fields).filter((post) => {
    const { tags } = post as unknown as IPost;
    return tags && lowercaseArrayOfStrings(tags).includes(tag);
  });
}

export function getAllTagsWithLocales(locales: string[]): Array<string> {
  const allPosts = getAllPosts(locales, ['slug', 'tags']);

  const flattenTags = lowercaseArrayOfStrings(allPosts.map((post) => post?.tags).flat());

  const allTags = flattenTags.filter((item, pos) => flattenTags.indexOf(item) == pos);
  return allTags;
}

export function getNextPostWithLocale(slug: string, locale: string) {
  const allPosts = getAllPostsByDateWithLocale(locale, ['title', 'slug', 'date']);

  const index = allPosts.map((post) => post.slug).indexOf(slug);

  if (index === allPosts.length - 1 || index === -1) return null;

  return allPosts[index + 1];
}

export function getPreviousPostWithLocale(slug: string, locale: string) {
  const allPosts = getAllPostsByDateWithLocale(locale, ['title', 'slug', 'date']);

  const index = allPosts.map((post) => post.slug).indexOf(slug);

  if (index === 0 || index === -1) return null;

  return allPosts[index - 1];
}

export function getAlternateLanguageFromSlug(slug: string, currentLocale: string): Alternates {
  const allPostsSlugs = getPostSlugs();

  return allPostsSlugs
    .map((ps) => {
      const realSlugWithLocale = ps.replace(/\.md$/, '').split('.');
      return { slug: realSlugWithLocale[0], locale: realSlugWithLocale[1] };
    })
    .filter((ps) => ps.slug === slug && ps.locale !== currentLocale);
}

import fs from 'fs';
import { Feed } from 'feed';

import { getAllPostsByDateWithLocale } from 'features/Posts/api';

import { POST_ALL_FIELDS } from 'features/Posts';
import {
  ATOM_FEED_EXT,
  ATOM_FEED_URL,
  DEFAULT_LOCALE,
  FAVICON_URL,
  JSON_FEED_EXT,
  JSON_FEED_URL,
  RSS_FEED_EXT,
  RSS_FEED_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from 'core/constants';

export default async function generateRssFeed(locale: string) {
  const allPosts = getAllPostsByDateWithLocale(locale, POST_ALL_FIELDS);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const feedOptions = {
    title: `${SITE_NAME} | RSS Feed`,
    description: SITE_DESCRIPTION[locale],
    id: locale === DEFAULT_LOCALE ? siteUrl : `${siteUrl}/${locale}/`,
    link: locale === DEFAULT_LOCALE ? siteUrl : `${siteUrl}/${locale}/`,
    language: locale,
    image: `${siteUrl}/assets/media/Logo-D2C.png`,
    favicon: `${siteUrl}${FAVICON_URL}`,
    copyright: `Copyright ${new Date().getFullYear()}, Fabien Schlegel`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}${RSS_FEED_URL}.${locale}${RSS_FEED_EXT}`,
      json: `${siteUrl}${JSON_FEED_URL}.${locale}${JSON_FEED_EXT}`,
      atom: `${siteUrl}${ATOM_FEED_URL}.${locale}${ATOM_FEED_EXT}`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title as string,
      id: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : '/' + locale}/blog/${post.slug}`,
      link: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : '/' + locale}/blog/${post.slug}`,
      description: post.excerpt as string,
      date: new Date(post.date as string),
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });

  fs.writeFileSync(`./public${RSS_FEED_URL}.${locale}${RSS_FEED_EXT}`, feed.rss2());
  fs.writeFileSync(`./public${JSON_FEED_URL}.${locale}${JSON_FEED_EXT}`, feed.json1());
  fs.writeFileSync(`./public${ATOM_FEED_URL}.${locale}${ATOM_FEED_EXT}`, feed.atom1());
}

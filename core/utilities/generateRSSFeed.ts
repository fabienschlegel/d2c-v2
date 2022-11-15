import fs from 'fs';
import { Feed } from 'feed';

import { getAllPostsByDate } from 'features/Posts/api';

import { POST_ALL_FIELDS } from 'features/Posts';
import { ATOM_FEED_URL, FAVICON_URL, JSON_FEED_URL, RSS_FEED_URL } from 'core/constants';

export default async function generateRssFeed() {
  const allPosts = await getAllPostsByDate(POST_ALL_FIELDS);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const feedOptions = {
    title: 'Dévoreur 2 code | RSS Feed',
    description: 'Another blog from a developer',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/assets/media/Logo-D2C.png`,
    favicon: `${siteUrl}${FAVICON_URL}`,
    copyright: `Copyright ${new Date().getFullYear()}, Fabien Schlegel`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}${RSS_FEED_URL}`,
      json: `${siteUrl}${JSON_FEED_URL}`,
      atom: `${siteUrl}${ATOM_FEED_URL}`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title as string,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt as string,
      date: new Date(post.date as string),
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });

  fs.writeFileSync(`./public${RSS_FEED_URL}`, feed.rss2());
  fs.writeFileSync(`./public${JSON_FEED_URL}`, feed.json1());
  fs.writeFileSync(`./public${ATOM_FEED_URL}`, feed.atom1());
}

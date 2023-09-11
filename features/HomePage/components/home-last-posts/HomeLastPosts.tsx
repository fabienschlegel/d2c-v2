import { FunctionComponent } from 'react';

import LastPostItem from './last-posts-item/LastPostsItem';

import type { PostSummary } from 'features/Posts/types';

import Style from './HomeLastPosts.module.scss';

interface HomeLastPostsProps {
  lastPosts: Array<PostSummary>;
}

const HomeLastPosts: FunctionComponent<HomeLastPostsProps> = ({ lastPosts }) => {
  return (
    <div className={Style.container}>
      <div className={Style['posts-grid']}>
        {lastPosts.map((post) => (
          <LastPostItem
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            authorName={post.author.name}
            authorAvatar={post.author.avatar}
            date={post.date}
            updated={post.updated}
            tags={post.tags}
            coverImageSrc={post.coverImage}
            readingTime={post.readingTime}
            locale={post.locale}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeLastPosts;

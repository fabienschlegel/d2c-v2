import { FunctionComponent } from 'react';

import { LargeSummaryCard } from 'features/Posts';

import Style from '../HomeLastPosts.module.scss';

interface LastPostItemProps {
  title: string;
  excerpt: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  updated?: string;
  tags?: Array<string>;
  coverImageSrc?: string;
}

const LastPostItem: FunctionComponent<LastPostItemProps> = ({
  title,
  excerpt,
  slug,
  authorName,
  authorAvatar,
  date,
  readingTime,
  updated,
  tags,
  coverImageSrc,
}) => {
  return (
    <div className={Style['posts-item']}>
      <LargeSummaryCard
        title={title}
        excerpt={excerpt}
        slug={slug}
        authorName={authorName}
        authorAvatar={authorAvatar}
        date={date}
        updated={updated}
        tags={tags}
        coverImageSrc={coverImageSrc}
        readingTime={readingTime}
      />
    </div>
  );
};

export default LastPostItem;

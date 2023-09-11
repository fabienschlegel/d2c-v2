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
  locale: string;
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
  locale,
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
        locale={locale}
      />
    </div>
  );
};

export default LastPostItem;

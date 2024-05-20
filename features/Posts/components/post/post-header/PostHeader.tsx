import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import { Heading } from '@the-sleeping-dog/react-components';

import { uppercaseFirst } from 'core';

import { AuthorAvatar, CoverImage, PostTag, ReadingTimeTag } from '../..';

import styles from './PostHeader.module.scss';

interface PostHeaderProps {
  title: string;
  authorName: string;
  date: string;
  readingTime: string;
  locale: string;
  updated?: string;
  coverImageSrc?: string;
  avatarSrc?: string;
  tags?: Array<string>;
}

export type PostHeaderType = FunctionComponent<PostHeaderProps>;

const PostHeader: PostHeaderType = ({
  title,
  authorName,
  date,
  readingTime,
  locale,
  updated,
  coverImageSrc,
  avatarSrc,
  tags,
}) => {
  const { t } = useTranslation('posts');
  return (
    <div className="flex flex-col">
      <Heading className="is-size-1 mb-4">{uppercaseFirst(title)}</Heading>
      <div className="flex align-center justify-between mb-4">
        <div className="flex align-center gap-2">
          {avatarSrc && <AuthorAvatar avatarUrl={avatarSrc} name={authorName} />}
          <p>{authorName}</p>
        </div>
        <ReadingTimeTag>{readingTime}</ReadingTimeTag>
      </div>
      <div className={styles['release-time-container']}>
        <p>{`${t('published')}: ${new Intl.DateTimeFormat(locale).format(new Date(date))}`}</p>
        {updated && (
          <p>{`${t('updated')}: ${new Intl.DateTimeFormat(locale).format(new Date(updated))}`}</p>
        )}
      </div>
      {tags && (
        <div className={styles['tag-stack']}>
          {tags.map((tag) => (
            <PostTag key={tag} tag={tag} />
          ))}
        </div>
      )}
      {coverImageSrc && <CoverImage coverImageSrc={coverImageSrc} title={title} />}
    </div>
  );
};

export default PostHeader;

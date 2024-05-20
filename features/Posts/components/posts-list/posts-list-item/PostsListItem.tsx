import { FunctionComponent } from 'react';

import clsx from 'clsx';
import { uppercaseFirst } from 'core';

import { useTranslation } from 'next-i18next';

import NextLink from 'next/link';

import { Heading } from '@the-sleeping-dog/react-components';

import { Icon } from 'common';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink, CoverImage, PostTag, ReadingTimeTag } from '../..';

import styles from './PostsListItem.module.scss';

interface PostsListItemProps {
  title: string;
  date: string;
  authorName: string;
  excerpt: string;
  slug: string;
  readingTime: string;
  locale: string;
  updated?: string;
  tags?: Array<string>;
  coverImage?: string;
}

export type PostsListItemType = FunctionComponent<PostsListItemProps>;

const PostsListItem: PostsListItemType = ({
  title,
  date,
  authorName,
  excerpt,
  slug,
  readingTime,
  locale,
  updated,
  tags,
  coverImage,
}) => {
  const { t } = useTranslation('posts');
  return (
    <div className={styles.container}>
      <NextLink href={slug} passHref>
        <Heading headingLevel="h2" className={clsx(styles.title)}>
          {uppercaseFirst(title)}
        </Heading>
      </NextLink>
      <div className="flex align-center justify-between mb-4">
        <p>{`${t('writtenBy')} ${authorName}`}</p>
        <ReadingTimeTag>{readingTime}</ReadingTimeTag>
      </div>
      <div className="flex align-center gap-4 mb-4">
        <p>{new Intl.DateTimeFormat(locale).format(new Date(date))}</p>
        {updated && (
          <p>{`(${t('updated')}: ${new Intl.DateTimeFormat(locale).format(new Date(updated))})`}</p>
        )}
      </div>
      {tags && (
        <div className="flex align-center gap-2 mb-4">
          {tags.map((tag) => (
            <PostTag key={tag} tag={tag} />
          ))}
        </div>
      )}
      {coverImage && <CoverImage coverImageSrc={coverImage} title={title} />}
      <p className="mb-4">{excerpt}</p>
      <div className="mb-5">
        <ButtonLink href={slug} label={t('readMore')} rightIcon={<Icon icon={faChevronRight} />} />
      </div>
    </div>
  );
};

export default PostsListItem;

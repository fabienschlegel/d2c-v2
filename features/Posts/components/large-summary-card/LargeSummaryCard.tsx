import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import clsx from 'clsx';

import NextLink from 'next/link';
import NextImage from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { AuthorAvatar, ButtonLink, ReadingTimeTag } from '..';

import TagsList from './tags-list/TagsList';

import { uppercaseFirst } from 'core';

import Style from './LargeSummaryCard.module.scss';

interface LargeSummaryCardProps {
  title: string;
  excerpt: string;
  slug: string;
  readingTime: string;
  locale: string;
  updated?: string;
  authorName?: string;
  authorAvatar?: string;
  date?: string;
  tags?: Array<string>;
  coverImageSrc?: string;
}

const LargeSummaryCard: FunctionComponent<LargeSummaryCardProps> = ({
  title,
  excerpt,
  slug,
  readingTime,
  locale,
  updated,
  authorName,
  authorAvatar,
  date,
  tags,
  coverImageSrc,
}) => {
  const { t } = useTranslation('posts');
  return (
    <div className={Style.container}>
      <div className={Style['img-container']}>
        <NextImage
          width={800}
          height={450}
          src={coverImageSrc || '/assets/media/D2C-fond-transparent.webp'}
          alt={t('altCoverImageLargeSummaryCard')}
          className={Style.illustration}
        />
      </div>
      <div className={Style['info-container']}>
        <div className="flex flex-col">
          {tags && <TagsList tags={tags} />}
          <NextLink href={`/blog/${slug}`} passHref>
            <h2 className={Style['info-heading']}>{title && uppercaseFirst(title)}</h2>
          </NextLink>
          <p className={Style.excerpt}>{excerpt}</p>
        </div>
        <div className="flex flex-col">
          {authorAvatar && authorName && date && (
            <div className={Style['author-container']}>
              <AuthorAvatar avatarUrl={authorAvatar} name={authorName} />
              <p className={Style.author}>{authorName}</p>
              <p>—</p>
              <p>{`${new Intl.DateTimeFormat(locale).format(new Date(updated || date))}${
                updated ? ` (${t('updated')})` : ''
              }`}</p>
            </div>
          )}
          <div className={clsx('flex align-center justify-between', Style['cta-container'])}>
            <ButtonLink
              href={`/blog/${slug}`}
              label={t('readPost')}
              rightIcon={
                <FontAwesomeIcon icon={faChevronRight} className={Style['read-btn__icon']} />
              }
            />
            <ReadingTimeTag>{readingTime}</ReadingTimeTag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeSummaryCard;

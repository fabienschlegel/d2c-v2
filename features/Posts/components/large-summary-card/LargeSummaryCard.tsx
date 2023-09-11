import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import clsx from 'clsx';

import NextLink from 'next/link';
import NextImage from 'next/image';

import { HStack, Tag, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink } from '..';

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
            <HStack marginTop="1rem" spacing="2" display="flex" alignItems="center">
              <div className={Style['avatar-container']}>
                <NextImage
                  className={Style.avatar}
                  src={authorAvatar}
                  alt={authorName}
                  width={50}
                  height={50}
                />
              </div>
              <p className={Style.author}>{authorName}</p>
              <p>—</p>
              <p>{`${new Intl.DateTimeFormat(locale).format(new Date(updated || date))}${
                updated ? ` (${t('updated')})` : ''
              }`}</p>
            </HStack>
          )}
          <div className={clsx('flex align-center justify-between', Style['cta-container'])}>
            <ButtonLink
              href={`/blog/${slug}`}
              label={t('readPost')}
              rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
            />
            <Tag backgroundColor="brand.green" color="gray.900">
              <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
              {readingTime}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeSummaryCard;

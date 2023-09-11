import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import NextLink from 'next/link';

import { Box, Flex, Heading, HStack, Tag, Text, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';

import { uppercaseFirst } from 'core';

import { ButtonLink, CoverImage, PostTag } from '../..';

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
    <Flex flexDirection="column" borderBottom="1px solid #dcdcdc" marginBottom="1em">
      <NextLink href={slug} passHref>
        <Heading marginBottom=".5em" cursor="pointer">
          {uppercaseFirst(title)}
        </Heading>
      </NextLink>
      <Flex marginBottom={4} align="center" justify="space-between">
        <Text>{`${t('writtenBy')} ${authorName}`}</Text>
        <Tag backgroundColor="brand.green" color="gray.900">
          <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
          {readingTime}
        </Tag>
      </Flex>
      <Flex marginBottom={4} align="center" gap={4}>
        <Text>{new Intl.DateTimeFormat(locale).format(new Date(date))}</Text>
        {updated && (
          <Text>{`(${t('updated')}: ${new Intl.DateTimeFormat(locale).format(
            new Date(updated)
          )})`}</Text>
        )}
      </Flex>
      {tags && (
        <HStack spacing={2} marginBottom="1rem">
          {tags.map((tag) => (
            <PostTag key={tag} tag={tag} />
          ))}
        </HStack>
      )}
      {coverImage && <CoverImage coverImageSrc={coverImage} title={title} />}
      <Text marginBottom="1.25em">{excerpt}</Text>
      <Box marginBottom="1.5em">
        <ButtonLink
          href={slug}
          label={t('readMore')}
          rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
        />
      </Box>
    </Flex>
  );
};

export default PostsListItem;

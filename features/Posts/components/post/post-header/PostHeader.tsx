import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import { Flex, Heading, Text, HStack, Tag, Icon } from '@chakra-ui/react';

import { uppercaseFirst } from 'core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { BlogImage } from 'common';

import { CoverImage, PostTag } from '../..';

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
    <Flex direction="column">
      <Heading as="h1" size="2xl" marginBottom={4}>
        {uppercaseFirst(title)}
      </Heading>
      <Flex alignItems="center" justifyContent="space-between" marginBottom={4}>
        <Flex alignItems="center">
          {avatarSrc && (
            <Flex
              borderRadius="full"
              boxSize="50px"
              border="1px solid"
              borderColor="brand.darkBlue"
              marginRight="1rem"
            >
              <BlogImage
                borderRadius="full"
                width={50}
                height={50}
                borderColor="brand.darkBlue"
                src={avatarSrc}
                alt={authorName}
              />
            </Flex>
          )}
          <Text size="md">{authorName}</Text>
        </Flex>
        <Tag backgroundColor="brand.green" color="gray.900">
          <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
          {readingTime}
        </Tag>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" gap={4} marginBottom={8}>
        <Text>{`${t('published')}: ${new Intl.DateTimeFormat(locale).format(
          new Date(date)
        )}`}</Text>
        {updated && (
          <Text>{`${t('updated')}: ${new Intl.DateTimeFormat(locale).format(
            new Date(updated)
          )}`}</Text>
        )}
      </Flex>
      {tags && (
        <HStack spacing={2} marginBottom="1rem">
          {tags.map((tag) => (
            <PostTag key={tag} tag={tag} />
          ))}
        </HStack>
      )}
      {coverImageSrc && <CoverImage coverImageSrc={coverImageSrc} title={title} />}
    </Flex>
  );
};

export default PostHeader;

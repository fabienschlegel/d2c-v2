import { FunctionComponent } from 'react';

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
  updated,
  tags,
  coverImage,
}) => {
  return (
    <Flex flexDirection="column" borderBottom="1px solid #dcdcdc" marginBottom="1em">
      <NextLink href={slug} passHref>
        <Heading marginBottom=".5em" cursor="pointer">
          {uppercaseFirst(title)}
        </Heading>
      </NextLink>
      <Flex marginBottom={4} align="center" justify="space-between">
        <Text>{`Written by ${authorName}`}</Text>
        <Tag backgroundColor="brand.green" color="gray.900">
          <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
          {readingTime}
        </Tag>
      </Flex>
      <Flex marginBottom={4} align="center" gap={4}>
        <Text>{date}</Text>
        {updated && <Text>{`(updated: ${updated})`}</Text>}
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
          label="Read More"
          rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
        />
      </Box>
    </Flex>
  );
};

export default PostsListItem;

import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { FaChevronRight, FaClock } from 'react-icons/fa';

import { Box, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';

import { uppercaseFirst } from 'core';

import { ButtonLink, CoverImage, PostTag } from '../..';

interface PostsListItemProps {
  title: string;
  date: string;
  authorName: string;
  excerpt: string;
  slug: string;
  readingTime: string;
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
      <Flex marginBottom="1rem" align="center" justify="space-between">
        <Text>{`${date} - Written by ${authorName}`}</Text>
        <Tag backgroundColor="brand.greener" color="white">
          <Box marginRight="0.5rem">
            <FaClock />
          </Box>
          {readingTime}
        </Tag>
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
        <ButtonLink href={slug} label="Read More" rightIcon={<FaChevronRight />} />
      </Box>
    </Flex>
  );
};

export default PostsListItem;

import { FunctionComponent } from 'react';

import { Image, Flex, Heading, Text, HStack, Tag, Icon } from '@chakra-ui/react';

import { uppercaseFirst } from 'core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { CoverImage, PostTag } from '../..';

interface PostHeaderProps {
  title: string;
  authorName: string;
  date: string;
  readingTime: string;
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
  coverImageSrc,
  avatarSrc,
  tags,
}) => {
  return (
    <Flex direction="column">
      <Heading as="h1" size="2xl" marginBottom={4}>
        {uppercaseFirst(title)}
      </Heading>
      <Flex alignItems="center" justifyContent="space-between" marginBottom="20px">
        <Flex alignItems="center">
          {avatarSrc && (
            <Image
              borderRadius="full"
              boxSize="50px"
              border="1px solid"
              borderColor="brand.darkBlue"
              marginRight="1rem"
              src={avatarSrc}
              alt={authorName}
            />
          )}
          <Text size="md">{authorName}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text marginRight="2rem">{date}</Text>
          <Tag backgroundColor="brand.greener" color="white">
            <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
            {readingTime}
          </Tag>
        </Flex>
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

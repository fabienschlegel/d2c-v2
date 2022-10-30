import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { FaChevronRight, FaClock } from 'react-icons/fa';

import { Box, Flex, Heading, HStack, Image, Tag, Text } from '@chakra-ui/react';

import { ButtonLink } from '..';

import TagsList from './tags-list/TagsList';

import { uppercaseFirst } from 'core';

interface LargeSummaryCardProps {
  title: string;
  excerpt: string;
  slug: string;
  readingTime: string;
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
  authorName,
  authorAvatar,
  date,
  tags,
  coverImageSrc,
}) => {
  return (
    <Flex direction="column" justifyContent="space-between" height="100%">
      <Box borderRadius="lg" overflow="hidden">
        <Image
          transform="scale(1.0)"
          src={coverImageSrc || '/assets/media/D2C-fond-transparent.png'}
          alt="Cover image of the post"
          objectFit="contain"
          transition="0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
        />
      </Box>
      {tags && <TagsList tags={tags} />}
      <NextLink href={`/blog/${slug}`} passHref>
        <Heading fontSize="xl" marginTop="1rem" cursor="pointer">
          {uppercaseFirst(title)}
        </Heading>
      </NextLink>
      <Text marginTop="0.5rem">{excerpt}</Text>
      {authorAvatar && authorName && date && (
        <HStack marginTop="1rem" spacing="2" display="flex" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="50px"
            border="1px solid"
            borderColor="brand.darkBlue"
            src={authorAvatar}
            alt={authorName}
          />
          <Text fontWeight="medium">{authorName}</Text>
          <Text>—</Text>
          <Text>{date}</Text>
        </HStack>
      )}
      <Flex marginTop="1rem" align="center" justify="space-between">
        <ButtonLink href={`/blog/${slug}`} label="Read the post" rightIcon={<FaChevronRight />} />
        <Tag backgroundColor="brand.greener" color="white">
          <Box marginRight="0.5rem">
            <FaClock />
          </Box>
          {readingTime}
        </Tag>
      </Flex>
    </Flex>
  );
};

export default LargeSummaryCard;

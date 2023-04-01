import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { Flex, Heading, HStack, Tag, Text, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';

import { BlogImage } from 'common';

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
    <Flex direction="column" height="100%">
      <Flex borderTopRadius={5} overflow="hidden" borderBottom="1px solid #eee">
        <BlogImage
          transform="scale(1.0)"
          width={800}
          height={450}
          src={coverImageSrc || '/assets/media/D2C-fond-transparent.webp'}
          alt="Cover image of the post"
          objectFit="contain"
          transition="0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
        />
      </Flex>
      <Flex justifyContent="space-between" flex={1} direction="column" padding={4}>
        <Flex direction="column">
          {tags && <TagsList tags={tags} />}
          <NextLink href={`/blog/${slug}`} passHref>
            <Heading fontSize="xl" marginTop="1rem" cursor="pointer">
              {uppercaseFirst(title)}
            </Heading>
          </NextLink>
          <Text marginTop="0.5rem">{excerpt}</Text>
        </Flex>
        <Flex direction="column">
          {authorAvatar && authorName && date && (
            <HStack marginTop="1rem" spacing="2" display="flex" alignItems="center">
              <Flex
                borderRadius="full"
                boxSize="50px"
                border="1px solid"
                borderColor="brand.darkBlue"
              >
                <BlogImage
                  borderRadius="full"
                  width={50}
                  height={50}
                  src={authorAvatar}
                  alt={authorName}
                />
              </Flex>
              <Text fontWeight="medium">{authorName}</Text>
              <Text>—</Text>
              <Text>{date}</Text>
            </HStack>
          )}
          <Flex marginTop="1rem" align="center" justify="space-between">
            <ButtonLink
              href={`/blog/${slug}`}
              label="Read the post"
              rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
            />
            <Tag backgroundColor="brand.green" color="gray.900">
              <Icon as={FontAwesomeIcon} icon={faClock} mr={2} />
              {readingTime}
            </Tag>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LargeSummaryCard;

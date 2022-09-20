import { FunctionComponent } from "react";

import NextLink from "next/link";

import { Image, Flex, Heading, Text } from "@chakra-ui/react";

import { uppercaseFirst } from "core/textHelpers";

import { CoverImage } from "components";

interface PostHeaderProps {
  title: string;
  authorName: string;
  date: string;
  coverImageSrc?: string;
  avatarSrc?: string;
  tags?: Array<string>;
}

export type PostHeaderType = FunctionComponent<PostHeaderProps>;

const PostHeader: PostHeaderType = ({
  title,
  authorName,
  date,
  coverImageSrc,
  avatarSrc,
  tags,
}) => {
  return (
    <Flex direction="column">
      <Heading as="h1" size="2xl" marginBottom={4}>
        {uppercaseFirst(title)}
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20px"
      >
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
        <Text marginRight="2rem">{date}</Text>
      </Flex>
      {tags && (
        <Flex marginBottom="1rem">
          {tags.map((tag) => (
            <NextLink key={tag} href={`/tag/${tag}`} passHref>
              <Text
                marginRight="1rem"
                as="a"
                fontSize="sm"
                color="brand.darkBlue"
                fontWeight="bold"
              >{`#${tag}`}</Text>
            </NextLink>
          ))}
        </Flex>
      )}
      {coverImageSrc && (
        <CoverImage coverImageSrc={coverImageSrc} title={title} />
      )}
    </Flex>
  );
};

export default PostHeader;

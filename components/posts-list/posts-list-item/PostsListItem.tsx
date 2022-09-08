import { FunctionComponent } from "react";

import { FaChevronRight } from "react-icons/fa";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { uppercaseFirst } from "../../../core/textHelpers";

import { ButtonLink, CoverImage } from "../..";

interface PostsListItemProps {
  title: string;
  date: string;
  authorName: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
}

export type PostsListItemType = FunctionComponent<PostsListItemProps>;

const PostsListItem: PostsListItemType = ({
  title,
  date,
  authorName,
  excerpt,
  slug,
  coverImage,
}) => {
  return (
    <Flex
      flexDirection="column"
      borderBottom="1px solid #dcdcdc"
      marginBottom="1em"
    >
      <Heading marginBottom=".5em">{uppercaseFirst(title)}</Heading>
      <Text marginBottom="1em">{`${date} - Written by ${authorName}`}</Text>
      {coverImage && <CoverImage coverImageSrc={coverImage} title={title} />}
      <Text marginBottom="1.25em">{excerpt}</Text>
      <Box marginBottom="1.5em">
        <ButtonLink
          href={slug}
          label="Read More"
          rightIcon={<FaChevronRight />}
        />
      </Box>
    </Flex>
  );
};

export default PostsListItem;

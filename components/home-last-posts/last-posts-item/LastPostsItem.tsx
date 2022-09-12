import { FunctionComponent } from "react";

import NextLink from "next/link";

import { FaChevronRight } from "react-icons/fa";

import {
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";

import { uppercaseFirst } from "core/textHelpers";
import ButtonLink from "components/button-link/ButtonLink";

interface LastPostItemProps {
  title: string;
  excerpt: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  tags?: Array<string>;
  coverImageSrc?: string;
}

const LastPostItem: FunctionComponent<LastPostItemProps> = ({
  title,
  excerpt,
  slug,
  authorName,
  authorAvatar,
  date,
  tags,
  coverImageSrc,
}) => {
  return (
    <Box
      padding="1em"
      boxShadow="0px 2px 2px rgba(40, 53, 147, 0.02), 0px 5px 5px rgba(40, 53, 147, 0.03), 0px 24px 38px rgba(40, 53, 147, 0.08);"
      borderRadius="6px;"
      width={{ base: "100%", md: "40%", lg: "30%" }}
      marginBottom={{ base: "2em", md: 0 }}
    >
      <Box borderRadius="lg" overflow="hidden">
        <Image
          transform="scale(1.0)"
          src={coverImageSrc || "/assets/media/D2C-fond-transparent.png"}
          alt="some text"
          objectFit="contain"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Box>
      {tags && (
        <HStack spacing={2} marginTop="1em">
          {tags.map((tag) => (
            <NextLink key={tag} href={`/tag/${tag}`} passHref>
              <Tag
                size={"md"}
                variant="solid"
                backgroundColor="brand.blue"
                cursor="pointer"
              >
                {tag}
              </Tag>
            </NextLink>
          ))}
        </HStack>
      )}
      <NextLink href={`/blog/${slug}`} passHref>
        <Heading fontSize="xl" marginTop="1em" cursor="pointer">
          {uppercaseFirst(title)}
        </Heading>
      </NextLink>
      <Text marginTop="0.5em">{excerpt}</Text>
      <HStack marginTop="1em" spacing="2" display="flex" alignItems="center">
        <Avatar size="md" src={authorAvatar} />
        <Text fontWeight="medium">{authorName}</Text>
        <Text>—</Text>
        <Text>{date}</Text>
      </HStack>
      <Box marginTop="1em">
        <ButtonLink
          href={`/blog/${slug}`}
          label="Read the post"
          rightIcon={<FaChevronRight />}
        />
      </Box>
    </Box>
  );
};

export default LastPostItem;

import { FunctionComponent } from "react";

import { Avatar, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { uppercaseFirst } from "../../../core/textHelpers";

import styles from "./PostHeader.module.scss";

interface PostHeaderProps {
  title: string;
  authorName: string;
  date: string;
  coverImageSrc?: string;
  avatarSrc?: string;
}

export type PostHeaderType = FunctionComponent<PostHeaderProps>;

const PostHeader: PostHeaderType = ({
  title,
  authorName,
  date,
  coverImageSrc,
  avatarSrc,
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
            <Avatar size="md" src={avatarSrc} className={styles.avatar} />
          )}
          <Text size="md">{authorName}</Text>
        </Flex>
        <Text className={styles.date}>{date}</Text>
      </Flex>
      {coverImageSrc && (
        <Image
          src={coverImageSrc}
          alt={`Cover image for ${title}`}
          className={styles["cover-image"]}
        />
      )}
    </Flex>
  );
};

export default PostHeader;

import { FunctionComponent } from "react";

import clsx from "clsx";

import { Button, Flex, Text } from "@chakra-ui/react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import styles from "./PostsListNavigation.module.scss";

interface PostsListNavigationProps {
  previous: boolean;
  next: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

export type PostListNavigationType =
  FunctionComponent<PostsListNavigationProps>;

const PostsListNavigation: PostListNavigationType = ({
  previous,
  next,
  previousPage,
  nextPage,
}) => {
  return (
    <Flex
      justifyContent={previous && next ? "space-between" : "center"}
      className={styles.container}
    >
      {previous && (
        <Button
          leftIcon={<FaChevronLeft />}
          colorScheme="gray"
          variant="solid"
          size={["xs", "md"]}
          className={clsx(styles["nav-button"], next && styles.left)}
          onClick={previousPage}
        >
          <Text fontSize={["xs", "md"]} className={styles["text-button"]}>
            Newer Posts
          </Text>
        </Button>
      )}
      {next && (
        <Button
          rightIcon={<FaChevronRight />}
          colorScheme="gray"
          variant="solid"
          size={["xs", "md"]}
          className={clsx(styles["nav-button"], previous && styles.right)}
          onClick={nextPage}
        >
          <Text fontSize={["xs", "md"]} className={styles["text-button"]}>
            Older posts
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default PostsListNavigation;

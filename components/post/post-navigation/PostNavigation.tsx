import { FunctionComponent } from "react";

import Link from "next/link";

import clsx from "clsx";

import { Button, Flex, Text } from "@chakra-ui/react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { uppercaseFirst } from "../../../core/textHelpers";

import styles from "./PostNavigation.module.scss";

interface PostNavigationProps {
  previous: {
    title: string;
    href: string;
  } | null;
  next: {
    title: string;
    href: string;
  } | null;
}

export type PostNavigationType = FunctionComponent<PostNavigationProps>;

const PostNavigation: PostNavigationType = ({ previous, next }) => {
  return (
    <Flex
      justifyContent={previous && next ? "space-between" : "center"}
      className={styles.container}
    >
      {previous && (
        <Link href={previous.href} passHref>
          <Button
            leftIcon={<FaChevronLeft />}
            as="a"
            colorScheme="gray"
            variant="solid"
            size={["xs", "md"]}
            className={clsx(styles["nav-button"], next && styles.left)}
          >
            <Text fontSize={["xs", "md"]} className={styles["text-button"]}>
              {uppercaseFirst(previous.title)}
            </Text>
          </Button>
        </Link>
      )}
      {next && (
        <Link href={next.href} passHref>
          <Button
            rightIcon={<FaChevronRight />}
            as="a"
            colorScheme="gray"
            variant="solid"
            size={["xs", "md"]}
            className={clsx(styles["nav-button"], previous && styles.right)}
          >
            <Text fontSize={["xs", "md"]} className={styles["text-button"]}>
              {uppercaseFirst(next.title)}
            </Text>
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default PostNavigation;

import { FunctionComponent } from "react";

import { Flex } from "@chakra-ui/react";

import LastPostItem from "./last-posts-item/LastPostsItem";

import { PostSummary } from "core/types";

interface HomeLastPostsProps {
  lastPosts: Array<PostSummary>;
}

const HomeLastPosts: FunctionComponent<HomeLastPostsProps> = ({
  lastPosts,
}) => {
  return (
    <Flex
      width="100%"
      padding={{ base: "0.5em", lg: "1em" }}
      align="center"
      justify={"space-evenly"}
      backgroundColor="white"
      minHeight="80vh"
      direction={{ base: "column", md: "row" }}
      flexWrap={{ base: "wrap", lg: "nowrap" }}
    >
      {lastPosts.map((post) => (
        <LastPostItem
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          slug={post.slug}
          authorName={post.author.name}
          authorAvatar={post.author.avatar}
          date={post.date}
          tags={post.tags}
          coverImageSrc={post.coverImage}
        />
      ))}
    </Flex>
  );
};

export default HomeLastPosts;

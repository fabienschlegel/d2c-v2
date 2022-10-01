import { FunctionComponent } from "react";

import { Box, Grid } from "@chakra-ui/react";

import LastPostItem from "./last-posts-item/LastPostsItem";

import type { PostSummary } from "features/Posts/types";

interface HomeLastPostsProps {
  lastPosts: Array<PostSummary>;
}

const HomeLastPosts: FunctionComponent<HomeLastPostsProps> = ({
  lastPosts,
}) => {
  return (
    <Box
      width="100%"
      minHeight="80vh"
      padding={{ base: "3rem 0.5rem", md: "3rem 0.5rem", lg: "3rem" }}
      backgroundColor="gray.50"
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{ base: 3, md: 6 }}
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
      </Grid>
    </Box>
  );
};

export default HomeLastPosts;

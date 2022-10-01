import { FunctionComponent } from "react";

import { GridItem } from "@chakra-ui/react";

import { LargeSummaryCard } from "features/Posts";

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
    <GridItem
      padding="1rem"
      boxShadow="0px 2px 2px rgba(40, 53, 147, 0.02), 0px 5px 5px rgba(40, 53, 147, 0.03), 0px 24px 38px rgba(40, 53, 147, 0.08);"
      borderRadius="6px;"
      width="100%"
      marginBottom={{ base: "2rem", md: 0 }}
    >
      <LargeSummaryCard
        title={title}
        excerpt={excerpt}
        slug={slug}
        authorName={authorName}
        authorAvatar={authorAvatar}
        date={date}
        tags={tags}
        coverImageSrc={coverImageSrc}
      />
    </GridItem>
  );
};

export default LastPostItem;

import { FunctionComponent } from 'react';

import { GridItem } from '@chakra-ui/react';

import { LargeSummaryCard } from 'features/Posts';

interface LastPostItemProps {
  title: string;
  excerpt: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
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
  readingTime,
  tags,
  coverImageSrc,
}) => {
  return (
    <GridItem
      padding="1rem"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      borderRadius="6px;"
      width="100%"
      marginBottom={{ base: '2rem', md: 0 }}
      backgroundColor="white"
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
        readingTime={readingTime}
      />
    </GridItem>
  );
};

export default LastPostItem;

import { FunctionComponent } from 'react';

import { Divider, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';

import { LargeSummaryCard } from 'features/Posts/components';

import { PostSummary } from 'features/Posts/types';

interface PostRelatedArticlesProps {
  relatedArticles: PostSummary[];
}

export type PostRelatedArticlesType = FunctionComponent<PostRelatedArticlesProps>;

const PostRelatedArticles: PostRelatedArticlesType = ({ relatedArticles }) => {
  return (
    <Flex direction="column" marginTop="2.5rem">
      <Heading as="h2" size="lg">
        Related Articles
      </Heading>
      <Divider borderBottomWidth="2px" marginTop="0.5rem" borderColor={'brand.darkBlue'} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={6}
        marginTop="0.75rem"
      >
        {relatedArticles.map((related) => (
          <GridItem
            key={related.slug}
            padding="1rem"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
            borderRadius="6px;"
            width="100%"
            backgroundColor="white"
          >
            <LargeSummaryCard
              title={related.title}
              excerpt={related.excerpt}
              slug={related.slug}
              coverImageSrc={related.coverImage}
              readingTime={related.readingTime}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default PostRelatedArticles;

import { FunctionComponent } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PostsListNavigationProps {
  previous: boolean;
  next: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

export type PostListNavigationType = FunctionComponent<PostsListNavigationProps>;

const PostsListNavigation: PostListNavigationType = ({
  previous,
  next,
  previousPage,
  nextPage,
}) => {
  return (
    <Flex justifyContent={previous && next ? 'space-between' : 'center'}>
      {previous && (
        <Button
          leftIcon={<FaChevronLeft />}
          colorScheme="gray"
          variant="solid"
          size={['xs', 'md']}
          maxWidth="270px"
          onClick={previousPage}
        >
          <Text
            fontSize={['xs', 'md']}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Newer Posts
          </Text>
        </Button>
      )}
      {next && (
        <Button
          rightIcon={<FaChevronRight />}
          colorScheme="gray"
          variant="solid"
          size={['xs', 'md']}
          maxWidth="270px"
          onClick={nextPage}
        >
          <Text
            fontSize={['xs', 'md']}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Older posts
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default PostsListNavigation;

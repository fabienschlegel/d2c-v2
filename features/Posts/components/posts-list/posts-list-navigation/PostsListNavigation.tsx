import { FunctionComponent } from 'react';

import { Button, Flex, Text, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
          leftIcon={<Icon as={FontAwesomeIcon} icon={faChevronLeft} />}
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
          rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
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

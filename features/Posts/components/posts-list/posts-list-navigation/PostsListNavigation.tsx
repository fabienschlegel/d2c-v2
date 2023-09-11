import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('posts');
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
            {t('newerPosts')}
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
            {t('olderPosts')}
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default PostsListNavigation;

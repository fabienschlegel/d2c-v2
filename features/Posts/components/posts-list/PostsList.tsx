import { FunctionComponent, ReactNode } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import PostsListItem, { PostsListItemType } from './posts-list-item/PostsListItem';
import PostsListNavigation, {
  PostListNavigationType,
} from './posts-list-navigation/PostsListNavigation';

interface IPostsListComposition {
  Item: PostsListItemType;
  Navigation: PostListNavigationType;
}

interface PostsListProps {
  children: ReactNode;
}

type PostsListType = FunctionComponent<PostsListProps> & IPostsListComposition;

const PostsList: PostsListType = ({ children }) => {
  return (
    <Box width="100%" maxWidth={{ md: '660px', lg: '800px' }} padding={5} margin="0 auto 20px">
      <Flex flexDirection="column">{children}</Flex>
    </Box>
  );
};

PostsList.Item = PostsListItem;
PostsList.Navigation = PostsListNavigation;

export default PostsList;

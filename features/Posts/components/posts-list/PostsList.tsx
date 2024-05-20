import { FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import PostsListItem, { PostsListItemType } from './posts-list-item/PostsListItem';
import PostsListNavigation, {
  PostListNavigationType,
} from './posts-list-navigation/PostsListNavigation';

import styles from './PostsList.module.scss';

interface IPostsListComposition {
  Item: PostsListItemType;
  Navigation: PostListNavigationType;
}

interface PostsListProps {
  children: ReactNode;
}

type PostsListType = FunctionComponent<PostsListProps> & IPostsListComposition;

const PostsList: PostsListType = ({ children }) => {
  return <div className={clsx('flex flex-col', styles['posts-list'])}>{children}</div>;
};

PostsList.Item = PostsListItem;
PostsList.Navigation = PostsListNavigation;

export default PostsList;

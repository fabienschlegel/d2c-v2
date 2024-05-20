import { FunctionComponent, ReactNode } from 'react';

import PostContent, { PostContentType } from './post-content/PostContent';
import PostHeader, { PostHeaderType } from './post-header/PostHeader';
import PostNavigation, { PostNavigationType } from './post-navigation/PostNavigation';
import PostRelatedArticles, {
  PostRelatedArticlesType,
} from './post-related-articles/PostRelatedArticles';

import styles from './Post.module.scss';

interface IPostProps {
  children: ReactNode;
}

interface IPostComposition {
  Header: PostHeaderType;
  Content: PostContentType;
  Navigation: PostNavigationType;
  RelatedArticles: PostRelatedArticlesType;
}

type PostProps = FunctionComponent<IPostProps> & IPostComposition;

const Post: PostProps = ({ children }) => {
  return <div className={styles.post}>{children}</div>;
};

Post.Header = PostHeader;
Post.Content = PostContent;
Post.Navigation = PostNavigation;
Post.RelatedArticles = PostRelatedArticles;

export default Post;

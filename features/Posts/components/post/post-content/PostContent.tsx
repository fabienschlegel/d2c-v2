import { FunctionComponent } from 'react';

import styles from './PostContent.module.scss';

interface PostContentProps {
  content: string;
}

export type PostContentType = FunctionComponent<PostContentProps>;

const PostContent: PostContentType = ({ content }) => {
  return <div className={styles.container} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostContent;

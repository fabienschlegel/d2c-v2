import { FunctionComponent } from 'react';

import { useCopyCodeToClipboard } from 'common/hooks';

import styles from './PostContent.module.scss';

interface PostContentProps {
  content: string;
}

export type PostContentType = FunctionComponent<PostContentProps>;

const PostContent: PostContentType = ({ content }) => {
  const rootRef = useCopyCodeToClipboard();

  return (
    <div ref={rootRef} className={styles.container} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default PostContent;

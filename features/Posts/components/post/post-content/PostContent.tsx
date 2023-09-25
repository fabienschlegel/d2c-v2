
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
    <div className={styles.container}>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostContent;

import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { Tag } from '@the-sleeping-dog/react-components';

import styles from './PostTag.module.scss';

interface PostTagProps {
  tag: string;
}

const PostTag: FunctionComponent<PostTagProps> = ({ tag }) => {
  const lowercasedTag = tag.toLowerCase();

  return (
    <NextLink href={`/tag/${lowercasedTag}`} passHref>
      <Tag className={styles['post-tag']}>{`#${lowercasedTag}`}</Tag>
    </NextLink>
  );
};

export default PostTag;

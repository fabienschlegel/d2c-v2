import { FunctionComponent } from 'react';

import clsx from 'clsx';

import { Flex } from '@chakra-ui/react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { ButtonLink } from '../..';

import styles from './PostNavigation.module.scss';

interface PostNavigationProps {
  previous: {
    title: string;
    href: string;
  } | null;
  next: {
    title: string;
    href: string;
  } | null;
}

export type PostNavigationType = FunctionComponent<PostNavigationProps>;

const PostNavigation: PostNavigationType = ({ previous, next }) => {
  return (
    <Flex
      justifyContent={previous && next ? 'space-between' : 'center'}
      className={styles.container}
    >
      {previous && (
        <ButtonLink
          href={previous.href}
          label={previous.title}
          leftIcon={<FaChevronLeft />}
          className={clsx(next && styles.left)}
        />
      )}
      {next && (
        <ButtonLink
          href={next.href}
          label={next.title}
          rightIcon={<FaChevronRight />}
          className={clsx(previous && styles.right)}
        />
      )}
    </Flex>
  );
};

export default PostNavigation;

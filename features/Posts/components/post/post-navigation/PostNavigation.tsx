import { FunctionComponent } from 'react';

import clsx from 'clsx';

import { Flex, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
          leftIcon={<Icon as={FontAwesomeIcon} icon={faChevronLeft} />}
          className={clsx(next && styles.left)}
        />
      )}
      {next && (
        <ButtonLink
          href={next.href}
          label={next.title}
          rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
          className={clsx(previous && styles.right)}
        />
      )}
    </Flex>
  );
};

export default PostNavigation;

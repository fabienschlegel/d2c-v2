import { FunctionComponent } from 'react';

import clsx from 'clsx';

import { Icon } from 'common';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink } from '../..';

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
    <div className={clsx('flex', previous && next ? 'justify-between' : 'justify-center', 'mt-55')}>
      {previous && (
        <ButtonLink
          href={previous.href}
          label={previous.title}
          leftIcon={<Icon icon={faChevronLeft} />}
          marginRight={next ? 2 : undefined}
        />
      )}
      {next && (
        <ButtonLink
          href={next.href}
          label={next.title}
          rightIcon={<Icon icon={faChevronRight} />}
          marginLeft={previous ? 2 : undefined}
        />
      )}
    </div>
  );
};

export default PostNavigation;

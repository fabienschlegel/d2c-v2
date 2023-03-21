import { FunctionComponent } from 'react';

import { Flex, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <Flex justifyContent={previous && next ? 'space-between' : 'center'} marginTop={10}>
      {previous && (
        <ButtonLink
          href={previous.href}
          label={previous.title}
          leftIcon={<Icon as={FontAwesomeIcon} icon={faChevronLeft} />}
          marginRight={next ? 2 : undefined}
        />
      )}
      {next && (
        <ButtonLink
          href={next.href}
          label={next.title}
          rightIcon={<Icon as={FontAwesomeIcon} icon={faChevronRight} />}
          marginLeft={previous ? 2 : undefined}
        />
      )}
    </Flex>
  );
};

export default PostNavigation;

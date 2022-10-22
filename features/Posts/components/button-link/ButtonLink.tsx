import { FunctionComponent, ReactElement } from 'react';

import NextLink from 'next/link';

import { uppercaseFirst } from 'core';

import { Button, Text } from '@chakra-ui/react';

interface ButtonLinkProps {
  href: string;
  label: string;
  className?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  href,
  label,
  className,
  leftIcon,
  rightIcon,
}) => {
  return (
    <NextLink href={href} passHref>
      <Button
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        as="a"
        colorScheme="gray"
        variant="solid"
        size={['xs', 'md']}
        className={className}
        maxWidth="270px"
      >
        <Text fontSize={['xs', 'md']} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {uppercaseFirst(label)}
        </Text>
      </Button>
    </NextLink>
  );
};

export default ButtonLink;

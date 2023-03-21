import { FunctionComponent, ReactElement } from 'react';

import NextLink from 'next/link';

import { uppercaseFirst } from 'core';

import { Button, ButtonProps, Text } from '@chakra-ui/react';

interface ButtonLinkProps {
  href: string;
  label: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

type ButtonLinkType = ButtonLinkProps & ButtonProps;

const ButtonLink: FunctionComponent<ButtonLinkType> = ({
  href,
  label,
  leftIcon,
  rightIcon,
  ...others
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
        maxWidth="270px"
        {...others}
      >
        <Text fontSize={['xs', 'md']} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {uppercaseFirst(label)}
        </Text>
      </Button>
    </NextLink>
  );
};

export default ButtonLink;

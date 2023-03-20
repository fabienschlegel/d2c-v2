import { FunctionComponent, ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

interface HeroSocialButtonProps {
  children: ReactNode;
  href: string;
}

const HeroSocialButton: FunctionComponent<HeroSocialButtonProps> = ({ children, href }) => {
  return (
    <Flex
      as="a"
      href={href}
      target="_blank"
      backgroundColor="brand.greener"
      color="white"
      rounded="full"
      w={16}
      h={16}
      cursor="pointer"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Flex>
  );
};

export default HeroSocialButton;

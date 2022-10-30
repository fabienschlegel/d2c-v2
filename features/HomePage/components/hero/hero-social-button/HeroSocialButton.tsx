import { FunctionComponent, ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

interface HeroSocialButtonProps {
  children: ReactNode;
  href: string;
}

const HeroSocialButton: FunctionComponent<HeroSocialButtonProps> = ({ children, href }) => {
  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      backgroundColor="brand.greener"
      color="white"
      rounded="full"
      w={16}
      h={16}
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default HeroSocialButton;

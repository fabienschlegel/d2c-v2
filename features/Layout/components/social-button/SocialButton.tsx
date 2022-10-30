import { FunctionComponent, ReactNode } from 'react';

import { chakra, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';

interface SocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
}

const SocialButton: FunctionComponent<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.100')}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as={'a'}
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
        color: useColorModeValue('white', 'blackAlpha.800'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default SocialButton;

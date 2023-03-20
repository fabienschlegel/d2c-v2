import { FunctionComponent, ReactNode } from 'react';

import { chakra, VisuallyHidden } from '@chakra-ui/react';

interface SocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
}

const SocialButton: FunctionComponent<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <chakra.button
      bg="blackAlpha.200"
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.4s ease"
      _hover={{
        bg: 'blackAlpha.800',
        color: 'white',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default SocialButton;

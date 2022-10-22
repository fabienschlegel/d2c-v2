import { FunctionComponent, ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

interface LayoutMainProps {
  children: ReactNode;
}

export type LayoutMainType = FunctionComponent<LayoutMainProps>;

const LayoutMain: LayoutMainType = ({ children }) => {
  return (
    <Flex as="main" display="flex" flex={1} flexDirection="column" alignItems="center">
      {children}
    </Flex>
  );
};

export default LayoutMain;

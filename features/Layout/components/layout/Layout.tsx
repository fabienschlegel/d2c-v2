import { FunctionComponent, ReactNode } from 'react';

import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import LayoutMain, { LayoutMainType } from './layout-main/LayoutMain';

interface LayoutComposition {
  Head: ({ children }: { children: ReactNode }) => JSX.Element;
  Main: LayoutMainType;
}

interface LayoutProps {
  children: ReactNode;
}

type LayoutType = FunctionComponent<LayoutProps> & LayoutComposition;

const Layout: LayoutType = ({ children }) => {
  return (
    <Flex display="flex" flexDirection="column" minHeight="100vh" padding={0}>
      {children}
    </Flex>
  );
};

Layout.Head = Head;
Layout.Main = LayoutMain;

export default Layout;

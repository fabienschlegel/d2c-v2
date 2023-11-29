import { FunctionComponent, ReactNode } from 'react';

import Head from 'next/head';

import LayoutMain, { LayoutMainType } from './layout-main/LayoutMain';

import Styles from './Layout.module.scss';
interface LayoutComposition {
  Head: ({ children }: { children: ReactNode }) => JSX.Element;
  Main: LayoutMainType;
}

interface LayoutProps {
  children: ReactNode;
}

type LayoutType = FunctionComponent<LayoutProps> & LayoutComposition;

const Layout: LayoutType = ({ children }) => <div className={Styles.container}>{children}</div>;

Layout.Head = Head;
Layout.Main = LayoutMain;

export default Layout;

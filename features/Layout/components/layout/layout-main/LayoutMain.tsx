import { FunctionComponent, ReactNode } from 'react';

import Styles from '../Layout.module.scss';

interface LayoutMainProps {
  children: ReactNode;
}

export type LayoutMainType = FunctionComponent<LayoutMainProps>;

const LayoutMain: LayoutMainType = ({ children }) => (
  <main className={Styles.main}>{children}</main>
);

export default LayoutMain;

import { FunctionComponent, ReactNode } from 'react';

import Styles from './SocialButton.module.scss';

interface SocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
}

const SocialButton: FunctionComponent<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <a className={Styles.container} href={href} target="_blank" rel="noreferrer">
      <span className={Styles.hidden}>{label}</span>
      {children}
    </a>
  );
};

export default SocialButton;

import { FunctionComponent, ReactNode } from 'react';

import Style from '../Hero.module.scss';

interface HeroSocialButtonProps {
  children: ReactNode;
  href: string;
  ariaLabel: string;
}

const HeroSocialButton: FunctionComponent<HeroSocialButtonProps> = ({
  children,
  href,
  ariaLabel,
}) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer"
      className={Style.socialbutton}
    >
      {children}
    </a>
  );
};

export default HeroSocialButton;

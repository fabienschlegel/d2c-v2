import { FunctionComponent } from 'react';

import NextLink from 'next/link';
import NextImage from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { LanguageSwitcher, SocialButton } from '..';

import { GITHUB_PROFILE_URL, LINKEDIN_URL, TWITTER_URL } from 'core/constants';

import Styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.container__stack}>
        <NextLink href="/" passHref>
          <NextImage
            className={Styles.logo}
            src="/assets/media/D2C-fond-transparent.webp"
            alt="Logo dévoreur 2 code"
            width={100}
            height={38}
          />
        </NextLink>
        <p>© 2022 Fabien Schlegel</p>
        <div className={Styles['social-media__stack']}>
          <SocialButton label="Twitter" href={TWITTER_URL}>
            <FontAwesomeIcon icon={faTwitter} className={Styles['social-media__icon']} />
          </SocialButton>
          <SocialButton label="LinkedIn" href={LINKEDIN_URL}>
            <FontAwesomeIcon icon={faLinkedinIn} className={Styles['social-media__icon']} />
          </SocialButton>
          <SocialButton label="Github" href={GITHUB_PROFILE_URL}>
            <FontAwesomeIcon icon={faGithub} className={Styles['social-media__icon']} />
          </SocialButton>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Footer;

import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import NextImage from 'next/image';

import macbook from 'public/assets/media/macbook.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import HeroSocialButton from './hero-social-button/HeroSocialButton';

import { GITHUB_PROFILE_URL, LINKEDIN_URL, TWITTER_URL } from 'core/constants';

import Style from './Hero.module.scss';

const Hero: FunctionComponent = () => {
  const { t } = useTranslation('home');

  const heroSocialButtons = [
    {
      id: 'twitter',
      href: TWITTER_URL,
      icon: faTwitter,
      ariaLabel: t('twitterProfile'),
    },
    {
      id: 'linkedin',
      href: LINKEDIN_URL,
      icon: faLinkedin,
      ariaLabel: t('linkedInProfile'),
    },
    {
      id: 'github',
      href: GITHUB_PROFILE_URL,
      icon: faGithub,
      ariaLabel: t('githubProfile'),
    },
  ];

  return (
    <div className={Style.container}>
      <NextImage src={macbook} alt={t('heroImageAlt')} priority />
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h3 className={Style.nameis}>{t('nameIs')}</h3>
          <h2 className={Style.myname}>Fabien Schlegel</h2>
          <h3 className={Style.myjob}>{t('myJob')}</h3>
        </div>
        <div className={Style.socialbuttons}>
          {heroSocialButtons.map((button) => (
            <HeroSocialButton key={button.id} href={button.href} ariaLabel={button.ariaLabel}>
              <FontAwesomeIcon icon={button.icon} className={Style.socialicon} />
            </HeroSocialButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

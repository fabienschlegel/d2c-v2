import NextLink from 'next/link';

import { useRouter } from 'next/router';

import { FunctionComponent } from 'react';

import { Stack, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';

import MobileNavItem from '../mobile-nav-item/MobileNavItem';

import { LanguageSwitcher } from '../..';

import { NAV_ITEMS } from 'features/Layout/constants';
import { RSS_FEED_EXT, RSS_FEED_URL } from 'core/constants';

const MobileNav: FunctionComponent = () => {
  const { locale } = useRouter();
  return (
    <Stack bg="white" p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <div className="flex align-center justify-evenly">
        <NextLink href={`${RSS_FEED_URL}.${locale}${RSS_FEED_EXT}`} passHref locale={false}>
          <Icon as={FontAwesomeIcon} icon={faRss} cursor="pointer" />
        </NextLink>
        <LanguageSwitcher />
      </div>
    </Stack>
  );
};

export default MobileNav;

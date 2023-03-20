import NextLink from 'next/link';

import { FunctionComponent } from 'react';

import { Stack, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';

import { NAV_ITEMS } from 'features/Layout/constants';
import { RSS_FEED_URL } from 'core/constants';

import MobileNavItem from '../mobile-nav-item/MobileNavItem';

const MobileNav: FunctionComponent = () => {
  return (
    <Stack bg="white" p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <NextLink href={RSS_FEED_URL} passHref>
        <Icon as={FontAwesomeIcon} icon={faRss} cursor="pointer" />
      </NextLink>
    </Stack>
  );
};

export default MobileNav;

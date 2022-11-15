import NextLink from 'next/link';

import { FunctionComponent } from 'react';

import { Stack, useColorModeValue } from '@chakra-ui/react';

import { FaRss } from 'react-icons/fa';

import { NAV_ITEMS } from 'features/Layout/constants';
import { RSS_FEED_URL } from 'core/constants';

import MobileNavItem from '../mobile-nav-item/MobileNavItem';

const MobileNav: FunctionComponent = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <NextLink href={RSS_FEED_URL} passHref>
        <a>
          <FaRss cursor="pointer" />
        </a>
      </NextLink>
    </Stack>
  );
};

export default MobileNav;

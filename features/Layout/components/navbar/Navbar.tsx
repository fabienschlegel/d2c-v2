import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import {
  Box,
  Flex,
  IconButton,
  Collapse,
  Icon,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRss, faTimes } from '@fortawesome/free-solid-svg-icons';

import DesktopNav from './desktop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';

import { RSS_FEED_URL } from 'core/constants';
import { BlogImage } from 'common';

const Navbar: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH="60px"
        py={2}
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={-2} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <Icon as={FontAwesomeIcon} icon={faTimes} />
              ) : (
                <Icon as={FontAwesomeIcon} icon={faBars} />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={1} align="center" justify={{ base: 'center', md: 'space-between' }}>
          <NextLink href="/" passHref>
            <Flex align={useBreakpointValue({ base: 'center', md: 'left' })} cursor="pointer">
              <BlogImage
                src="/assets/media/D2C-fond-transparent.webp"
                alt="Logo dévoreur 2 code"
                width={100}
                height={38}
              />
            </Flex>
          </NextLink>
          <Flex display={{ base: 'none', md: 'flex' }} mr={10}>
            <DesktopNav />
            <Flex align="center" justify="center" ml={10}>
              <NextLink href={RSS_FEED_URL} passHref>
                <a>
                  <Icon as={FontAwesomeIcon} icon={faRss} cursor="pointer" />
                </a>
              </NextLink>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;

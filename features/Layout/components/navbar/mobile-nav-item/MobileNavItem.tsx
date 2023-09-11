import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import NextLink from 'next/link';

import { Flex, Text, Stack, Collapse, Icon, Link, useDisclosure } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { INavItem } from '../../../types';

const MobileNavItem: FunctionComponent<INavItem> = ({ label, children, href }) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();

  if (href)
    return (
      <Flex py={2}>
        <Link as={NextLink} py={2} href={href}>
          {t(label)}
        </Link>
      </Flex>
    );

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color="gray.600">
          {t(label)}
        </Text>
        {children && (
          <Icon
            as={FontAwesomeIcon}
            icon={faChevronDown}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0 !important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor="gray.200"
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link as={NextLink} key={child.label} py={2} href={child.href}>
                {t(child.label)}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavItem;

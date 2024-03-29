import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import { Box, Flex, Text, Stack, Icon, Link } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { SubNavItem } from '../../../types';

const DesktopSubNav: FunctionComponent<SubNavItem> = ({ label, href, subLabel }) => {
  const { t } = useTranslation();
  return (
    <Link href={href} role="group" display="block" p={2} rounded="md" _hover={{ bg: 'pink.50' }}>
      <Stack direction="row" align="center">
        <Box>
          <Text transition="all .3s ease" _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {t(label)}
          </Text>
          {subLabel && <Text fontSize="sm">{t(subLabel)}</Text>}
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={FontAwesomeIcon} icon={faChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

export default DesktopSubNav;

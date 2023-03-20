import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { Box, Container, Stack, Text, useColorModeValue, Image, Icon } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { SocialButton } from '..';

import { GITHUB_PROFILE_URL, LINKEDIN_URL, TWITTER_URL } from 'core/constants';

const Footer: FunctionComponent = () => {
  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <NextLink href="/" passHref>
          <Image
            src="/assets/media/D2C-fond-transparent.webp"
            alt="Logo dévoreur 2 code"
            width="100px"
            cursor="pointer"
          />
        </NextLink>
        <Text>© 2022 Fabien Schlegel</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label="Twitter" href={TWITTER_URL}>
            <Icon as={FontAwesomeIcon} icon={faTwitter} />
          </SocialButton>
          <SocialButton label="LinkedIn" href={LINKEDIN_URL}>
            <Icon as={FontAwesomeIcon} icon={faLinkedinIn} />
          </SocialButton>
          <SocialButton label="Github" href={GITHUB_PROFILE_URL}>
            <Icon as={FontAwesomeIcon} icon={faGithub} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

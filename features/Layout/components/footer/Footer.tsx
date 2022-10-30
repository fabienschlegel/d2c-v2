import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { Box, Container, Stack, Text, useColorModeValue, Image } from '@chakra-ui/react';

import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

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
            src="/assets/media/D2C-fond-transparent.png"
            alt="Logo dévoreur 2 code"
            width="100px"
            cursor="pointer"
          />
        </NextLink>
        <Text>© 2022 Fabien Schlegel</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label="Twitter" href={TWITTER_URL}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label="LinkedIn" href={LINKEDIN_URL}>
            <FaLinkedin />
          </SocialButton>
          <SocialButton label="Github" href={GITHUB_PROFILE_URL}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

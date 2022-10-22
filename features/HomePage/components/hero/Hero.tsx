import { FunctionComponent } from 'react';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

import HeroSocialButton from './hero-social-button/HeroSocialButton';

import { GITHUB_PROFILE_URL, LINKEDIN_URL, TWITTER_URL } from 'core/constants';

const Hero: FunctionComponent = () => {
  return (
    <Flex
      width="100%"
      padding={{ base: '0.5em', lg: '6em' }}
      align="center"
      justify={'space-evenly'}
      backgroundColor="brand.darkBlue"
      minHeight={{ base: '80vh', lg: '70vh' }}
      direction={{ base: 'column-reverse', lg: 'row' }}
    >
      <Box>
        <Image
          filter="drop-shadow(10px 10px 4px rgba(0,0,0,0.3));"
          boxSize={{ base: '250px', md: '400px', lg: '400px' }}
          src="/assets/media/macbook.png"
          alt="Computer with coffee mug"
        />
      </Box>
      <Flex direction="column">
        <Flex direction="column">
          <Heading as="h3" size="lg" color="white">
            My name is
          </Heading>
          <Heading size={{ base: '2xl', lg: '3xl' }} color="brand.green">
            Fabien Schlegel
          </Heading>
          <Heading as="h3" size="lg" color="white" textAlign="right">
            Web Developer
          </Heading>
        </Flex>
        <Flex
          align="center"
          direction="row"
          justify="space-evenly"
          width="100%"
          padding="3em 0 0 0"
        >
          <HeroSocialButton href={TWITTER_URL}>
            <FaTwitter size={35} />
          </HeroSocialButton>
          <HeroSocialButton href={LINKEDIN_URL}>
            <FaLinkedin size={35} />
          </HeroSocialButton>
          <HeroSocialButton href={GITHUB_PROFILE_URL}>
            <FaGithub size={35} />
          </HeroSocialButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;

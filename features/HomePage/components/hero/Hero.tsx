import { FunctionComponent } from 'react';

import { Box, Flex, Heading, Icon, Image } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import HeroSocialButton from './hero-social-button/HeroSocialButton';

import { GITHUB_PROFILE_URL, LINKEDIN_URL, TWITTER_URL } from 'core/constants';

const heroSocialButtons = [
  {
    id: 'twitter',
    href: TWITTER_URL,
    icon: faTwitter,
  },
  {
    id: 'linkedin',
    href: LINKEDIN_URL,
    icon: faLinkedin,
  },
  {
    id: 'github',
    href: GITHUB_PROFILE_URL,
    icon: faGithub,
  },
];

const Hero: FunctionComponent = () => {
  return (
    <Flex
      width="100%"
      padding={{ base: 2, lg: 24 }}
      align="center"
      justify="space-evenly"
      backgroundColor="brand.darkBlue"
      minHeight={{ base: '80vh', lg: '70vh' }}
      direction={{ base: 'column-reverse', lg: 'row' }}
    >
      <Box>
        <Image
          filter="drop-shadow(10px 10px 4px rgba(0,0,0,0.3));"
          boxSize={{ base: '250px', md: '400px', lg: '400px' }}
          src="/assets/media/macbook.webp"
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
        <Flex align="center" direction="row" justify="space-evenly" width="100%" paddingTop={12}>
          {heroSocialButtons.map((button) => (
            <HeroSocialButton href={button.href} key={button.id}>
              <Icon
                as={FontAwesomeIcon}
                icon={button.icon}
                w={10}
                h={10}
                transition="transform 0.6s ease"
                _hover={{ transform: 'scale(1.5) translatey(-0.5rem)' }}
              />
            </HeroSocialButton>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;

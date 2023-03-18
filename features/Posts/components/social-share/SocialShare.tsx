import { FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';

import { VStack, useDisclosure, Slide, Box, Link, Flex } from '@chakra-ui/react';

import { faLinkedin, faTwitter, faFacebookF, faVk } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { shareToFacebook, shareToLinkedIn, shareToTwitter, shareToVK } from 'features/Marketing';

import { SITE_TWITTER_HANDLE, SITE_URL } from 'core/constants';

interface SocialShareProps {
  url: string;
  title: string;
}

interface SocialShareItem {
  name: 'twitter' | 'linkedIn' | 'facebook' | 'vk';
  ariaLabel: string;
  icon: ReactElement;
}

const socialShareItems: SocialShareItem[] = [
  {
    name: 'twitter',
    ariaLabel: 'share to Twitter',
    icon: <FontAwesomeIcon icon={faTwitter} />,
  },
  {
    name: 'linkedIn',
    ariaLabel: 'share to LinkedIn',
    icon: <FontAwesomeIcon icon={faLinkedin} />,
  },
  {
    name: 'facebook',
    ariaLabel: 'share to Facebook',
    icon: <FontAwesomeIcon icon={faFacebookF} />,
  },
  {
    name: 'vk',
    ariaLabel: 'share to VKontakte',
    icon: <FontAwesomeIcon icon={faVk} />,
  },
];

const SocialShare: FunctionComponent<SocialShareProps> = ({ url, title }) => {
  const [scrollY, setScrollY] = useState(0);
  const { isOpen, onToggle } = useDisclosure();

  const siteUrl = `${SITE_URL}/blog/${url}`;

  const socialShareUrls = {
    twitter: shareToTwitter({
      url: siteUrl,
      text: `I just read ${title}`,
      via: SITE_TWITTER_HANDLE,
    }),
    linkedIn: shareToLinkedIn(siteUrl),
    facebook: shareToFacebook(siteUrl),
    vk: shareToVK(siteUrl),
  };

  const handleShare = () => {
    console.log(url);
  };

  const onScroll = useCallback(() => {
    const { pageYOffset } = window;

    setScrollY(pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    if (scrollY > 50 && !isOpen) onToggle();
  }, [scrollY, isOpen, onToggle]);

  return (
    <Box pointerEvents="none">
      <Slide direction="left" in={isOpen}>
        <VStack
          position="fixed"
          left={0}
          top="40%"
          bg="brand.darkBlue"
          borderRadius="0 8px 8px 0"
          pointerEvents="all"
        >
          {socialShareItems.map((item) => (
            <Flex
              as={Link}
              key={item.name}
              href={socialShareUrls[item.name]}
              target="_blank"
              rel="noreferrer"
              aria-label={item.ariaLabel}
              isExternal
              onClick={handleShare}
              width={12}
              height={12}
              px={4}
              py={2}
              color="white"
              _hover={{
                bg: 'transparent',
                color: 'brand.green',
              }}
              _focus={{
                bg: 'transparent',
                color: 'brand.green',
              }}
            >
              {item.icon}
            </Flex>
          ))}
        </VStack>
      </Slide>
    </Box>
  );
};

export default SocialShare;

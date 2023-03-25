import { FunctionComponent } from 'react';

import { Flex } from '@chakra-ui/react';

import { BlogImage } from 'common';

interface CoverImageProps {
  coverImageSrc: string;
  title: string;
}

const CoverImage: FunctionComponent<CoverImageProps> = ({ coverImageSrc, title }) => {
  return (
    <Flex
      marginBottom={10}
      borderRadius={8}
      overflow="hidden"
      boxShadow="0 1rem 2rem rgba(0, 0, 0, 0.2)"
    >
      <BlogImage
        borderRadius={2}
        width={800}
        height={450}
        src={coverImageSrc}
        alt={`Cover image for ${title}`}
      />
    </Flex>
  );
};

export default CoverImage;

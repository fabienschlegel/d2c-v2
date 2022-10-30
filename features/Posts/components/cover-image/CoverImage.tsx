import { FunctionComponent } from 'react';

import { Image } from '@chakra-ui/react';

interface CoverImageProps {
  coverImageSrc: string;
  title: string;
}

const CoverImage: FunctionComponent<CoverImageProps> = ({ coverImageSrc, title }) => {
  return (
    <Image
      src={coverImageSrc}
      alt={`Cover image for ${title}`}
      marginBottom="2.5rem"
      borderRadius="0.5rem"
      boxShadow="0 1rem 2rem rgba(0, 0, 0, 0.2)"
    />
  );
};

export default CoverImage;

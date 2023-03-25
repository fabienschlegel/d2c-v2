import { FunctionComponent } from 'react';

import NextLink from 'next/link';

import { Tag } from '@chakra-ui/react';

interface PostTagProps {
  tag: string;
}

const PostTag: FunctionComponent<PostTagProps> = ({ tag }) => {
  const lowercasedTag = tag.toLowerCase();

  return (
    <NextLink href={`/tag/${lowercasedTag}`} passHref>
      <Tag
        size="md"
        variant="solid"
        backgroundColor="brand.blue"
        cursor="pointer"
        _hover={{ backgroundColor: 'brand.greenBlue' }}
        transition="0.5s ease-in-out"
      >
        {`#${lowercasedTag}`}
      </Tag>
    </NextLink>
  );
};

export default PostTag;

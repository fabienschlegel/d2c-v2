import { FunctionComponent } from 'react';

import { HStack } from '@chakra-ui/react';

import { PostTag } from '../..';

interface TagsListProps {
  tags: string[];
}

const TagsList: FunctionComponent<TagsListProps> = ({ tags }) => {
  return (
    <HStack alignItems="center" spacing={2}>
      {tags.map((tag) => (
        <PostTag key={tag} tag={tag} />
      ))}
    </HStack>
  );
};

export default TagsList;

import { FunctionComponent } from 'react';

import { PostTag } from '../..';

import Styles from './TagsList.module.scss';

interface TagsListProps {
  tags: string[];
}

const TagsList: FunctionComponent<TagsListProps> = ({ tags }) => {
  return (
    <div className={Styles.container}>
      {tags.map((tag) => (
        <PostTag key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default TagsList;

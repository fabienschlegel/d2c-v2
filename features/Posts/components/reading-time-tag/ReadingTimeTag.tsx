import { FunctionComponent, ReactNode } from 'react';

import { Tag } from '@the-sleeping-dog/react-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import styles from './ReadingTimeTag.module.scss';

interface ReadingTimeTagProps {
  children: ReactNode;
}

const ReadingTimeTag: FunctionComponent<ReadingTimeTagProps> = ({ children }) => {
  return (
    <Tag color="is-success" className="has-text-grey-900">
      <FontAwesomeIcon icon={faClock} className={styles['clock-icon']} />
      {children}
    </Tag>
  );
};

export default ReadingTimeTag;

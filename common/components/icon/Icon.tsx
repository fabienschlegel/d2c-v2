import { FunctionComponent } from 'react';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import styles from './Icon.module.scss';
import clsx from 'clsx';

const Icon: FunctionComponent<FontAwesomeIconProps> = (props) => {
  return <FontAwesomeIcon {...props} className={clsx(props?.className, styles.icon)} />;
};

export default Icon;

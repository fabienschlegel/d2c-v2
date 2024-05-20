import { FunctionComponent } from 'react';

import NextImage from 'next/image';

import styles from './AuthorAvatar.module.scss';

interface AuthorAvatarProps {
  avatarUrl: string;
  name: string;
}

const AuthorAvatar: FunctionComponent<AuthorAvatarProps> = ({ avatarUrl, name }) => {
  return (
    <div className={styles.container}>
      <NextImage className={styles.avatar} src={avatarUrl} alt={name} width={50} height={50} />
    </div>
  );
};

export default AuthorAvatar;

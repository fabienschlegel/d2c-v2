import { FunctionComponent } from 'react';

import { useTranslation } from 'next-i18next';

import NextImage from 'next/image';

import Styles from './CoverImage.module.scss';

interface CoverImageProps {
  coverImageSrc: string;
  title: string;
}

const CoverImage: FunctionComponent<CoverImageProps> = ({ coverImageSrc, title }) => {
  const { t } = useTranslation('posts');

  return (
    <div className={Styles.container}>
      <NextImage
        className={Styles.image}
        width={800}
        height={450}
        src={coverImageSrc}
        alt={t('altCoverImage', { title })}
      />
    </div>
  );
};

export default CoverImage;

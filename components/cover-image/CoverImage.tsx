import { FunctionComponent } from "react";

import { Image } from "@chakra-ui/react";

import styles from "./CoverImage.module.scss";

interface CoverImageProps {
  coverImageSrc: string;
  title: string;
}

const CoverImage: FunctionComponent<CoverImageProps> = ({
  coverImageSrc,
  title,
}) => {
  return (
    <Image
      src={coverImageSrc}
      alt={`Cover image for ${title}`}
      className={styles["cover-image"]}
    />
  );
};

export default CoverImage;

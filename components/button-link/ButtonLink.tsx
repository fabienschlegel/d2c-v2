import { FunctionComponent, ReactElement } from "react";

import Link from "next/link";

import clsx from "clsx";

import { Button, Text } from "@chakra-ui/react";

import { uppercaseFirst } from "../../core/textHelpers";

import styles from "./ButtonLink.module.scss";

interface ButtonLinkProps {
  href: string;
  label: string;
  className?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  href,
  label,
  className,
  leftIcon,
  rightIcon,
}) => {
  return (
    <Link href={href} passHref>
      <Button
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        as="a"
        colorScheme="gray"
        variant="solid"
        size={["xs", "md"]}
        className={clsx(styles["nav-button"], className)}
      >
        <Text fontSize={["xs", "md"]} className={styles["text-button"]}>
          {uppercaseFirst(label)}
        </Text>
      </Button>
    </Link>
  );
};

export default ButtonLink;

import { FunctionComponent, ReactElement } from "react";

import NextLink from "next/link";

import clsx from "clsx";

import { Button, Text } from "@chakra-ui/react";

import { uppercaseFirst } from "core/textHelpers";

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
    <NextLink href={href} passHref>
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
    </NextLink>
  );
};

export default ButtonLink;

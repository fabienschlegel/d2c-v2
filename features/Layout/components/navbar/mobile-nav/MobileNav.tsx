import { FunctionComponent } from "react";

import { Stack, useColorModeValue } from "@chakra-ui/react";

import { NAV_ITEMS } from "features/Layout/constants";

import MobileNavItem from "../mobile-nav-item/MobileNavItem";

const MobileNav: FunctionComponent = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

export default MobileNav;

import { FunctionComponent } from "react";

import NextLink from "next/link";

import {
  Box,
  Flex,
  IconButton,
  Collapse,
  Image,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { FaBars, FaTimes } from "react-icons/fa";

import DesktopNav from "./desktop-nav/DesktopNav";
import MobileNav from "./mobile-nav/MobileNav";

const Navbar: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <FaTimes /> : <FaBars />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href="/" passHref>
            <Image
              src="/assets/media/D2C-fond-transparent.png"
              alt="Logo dévoreur 2 code"
              align={useBreakpointValue({ base: "center", md: "left" })}
              width="100px"
              cursor="pointer"
            />
          </NextLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;

import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, VStack, Spacer } from "@chakra-ui/layout";
import {
  FaSun,
  FaMoon,
  FaInstagram,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import Profile from "./components/Profile";
import Social from "./components/Social";

function About() {
  return (
    <VStack p={5}>
      <Profile />
      <Social />
    </VStack>
  );
}

export default About;

import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Container, Flex, VStack, Spacer } from "@chakra-ui/layout";
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
      <Container>
        <Profile />
        <Social />
      </Container>
  );
}

export default About;

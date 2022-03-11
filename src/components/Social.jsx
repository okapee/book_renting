import Icon from "@chakra-ui/icon";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

function Social() {
  return (
    <HStack spacing="24">
      <Icon as={FaFacebookF} boxSize="30" />
      <Icon as={FaGoogle} boxSize="30" />
      <Icon as={FaTwitter} boxSize="30" />
    </HStack>
  );
}

export default Social;

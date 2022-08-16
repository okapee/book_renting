import Icon from '@chakra-ui/icon';
import { HStack } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

function Social() {
  return (
    <HStack justifyContent='center' spacing="24" p={4}>
      <Link href="https://www.facebook.com/okapee">
        <Icon as={FaFacebookF} boxSize="30" />
      </Link>
      <Link href="https://twitter.com/okapee0608">
        <Icon as={FaTwitter} boxSize="30" />
      </Link>
    </HStack>
  );
}

export default Social;

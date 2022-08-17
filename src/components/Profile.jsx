import React from 'react';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/react';
import { DiCodeigniter, DiAndroid, DiWebplatform } from 'react-icons/di';
import prof_img from '../assets/images/okapi.png';
import {
  VStack,
} from '@chakra-ui/react';

function Profile() {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');

  return (
    <VStack>
      <Image borderRadius="full" boxSize="300px" borderColor="gray" alt="okapee" src={prof_img} />
      <Text fontSize={{ base: '14px', md: '24px' }}>作者：okapee</Text>
      <Box m='unset'>
        <Text fontSize={{ base: '14px', md: '18px' }} m='20px' maxW='600px'>
          <Text as="mark">大好きな本</Text>
          をいろんな人と共有したり、自分で管理したりできる場を作りたくて本サービスを立ち上げました。
          <br /><br />
          一人だとできることも限られているので、一緒に開発してくださる方を募集しております。
          お気軽にお声がけいただけると嬉しいです。
        </Text>
      </Box>
    </VStack>
  );
}

export default Profile;

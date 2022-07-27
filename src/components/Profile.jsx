import React from 'react';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/react';
import { DiCodeigniter, DiAndroid, DiWebplatform } from 'react-icons/di';
import prof_img from '../assets/images/okapi.png';
import {
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

function Profile() {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');

  return (
    <Flex
      direction={isNotSmallerScreen ? 'row' : 'column'}
      w="100%"
      maxWidth={{ base: '100vh', md: '130vh', lg: '130vh', xl: '130vh' }}
    >
      <VStack>
        <Image
          borderRadius="full"
          boxSize="400px"
          borderColor="gray"
          borderWidth={10}
          alt="okapee"
          mt="10"
          src={prof_img}
        />
        <Text p={10} fontSize={{ base: '14px', md: '24px', lg: '30px' }}>
          作者：okapee
        </Text>
        <Flex
          flexDirection="column"
          justifyContent="left"
          alignItems="left"
          maxWidth="80%"
          m={10}
          p={20}
          fontSize={{ base: '14px', md: '24px', lg: '30px' }}
        >
          大好きな本をいろんな人と共有したり、自分で管理したりできる場を作りたくて本サービスを立ち上げました。
          一人だとできることも限られているので、一緒に開発してくださる方を募集しております。
          お気軽にお声がけいただけると嬉しいです。
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Profile;

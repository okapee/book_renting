import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Center,
  Heading,
  Avatar,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Auth, Amplify, API } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import { Rating } from 'react-simple-star-rating';

// AppSync試験用サンプルデータ
// const postBook = {
//   name: 'Todo 1',
//   description: 'Learn AWS AppSync'
// };

function BookCard(props) {
  const [username, setUserName] = useState('ななし');

    useEffect(() => {
      const fn = async () => {
        const loginInfo = await Auth.currentAuthenticatedUser();
        console.log(
          'BookCard.jsxのusername: ' +
            loginInfo.username +
            ' zoneinfo: ' +
            loginInfo.zoneinfo +
            ' picture: ' +
            loginInfo.picture +
            ' locale: ' +
            loginInfo.locale,
        );
        setUserName(loginInfo.username);
      };
      fn();
    }, []);

  const book = {
    ...props.bookInfo,
  };

  console.log(
    'Cards has ' +
      book.title +
      ' ' +
      book.longLine +
      ' ' +
      book.isbn +
      ' review: ' +
      book.review +
      ' rating: ' +
      book.rating +
      ' owner: ' +
      book.owner
  );

  return (
    <Box
      p={2}
      m={2}
      // my={2}
      // ml={2}
      // mr="auto"
      // borderWidth="1px"
      // borderColor="gray.300"
      rounded="4"
      // minw={500}
      // maxW={600}
      w={450}
      // w={calc( ( 800 - 60 ) / 3 )}
      bgColor="gray.100"
      boxShadow="md"
      display="flex"
      // justifyContent="center"
    >
      <HStack align="start">
        <Image src={book.thumbnail} borderRadius="xl" />
        <VStack p={4} align="start">
          <Heading size="lg">{book.title}</Heading>
          <HStack align="start" p={4}>
            <Avatar />
            <Text>{book.owner}</Text>
          </HStack>
          {/* <Box display="inline"> */}
            {/* <Rating size={0} ratingValue={book.rating} readonly="true" /> */}
            <Flex mb={4}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star key={value} filled={value <= book.rating} />
              ))}
            </Flex>
            {/* </Flex> */}
          {/* </Box> */}
          <Text mb={4} noOfLines={3}>
            {book.review}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

function Star({ filled }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'} />;
}

export default BookCard;

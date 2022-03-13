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
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { API } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import { Rating } from 'react-simple-star-rating';

// AppSync試験用サンプルデータ
// const postBook = {
//   name: 'Todo 1',
//   description: 'Learn AWS AppSync'
// };

function BookCard(props) {
  // const { title, longLine, thumbnail, authors, isbn, publishedDate } = props;
  const book = {
    ...props.bookInfo,
  };

  console.log('Cards has ' + book.title + ' ' + book.longLine + ' ' + book.isbn + ' review: ' + book.review + ' rating: ' + book.rating);

  return (
    <Box
      p={2}
      m={2}
      borderWidth="1px"
      borderColor="gray.500"
      rounded="4"
      minW="380"
      maxW="380px"
      bgColor="white"
      // display="flex"
      // justifyContent="center"
    >
      <HStack align="left">
        <Image src={book.thumbnail} />
        <VStack maxW="200px" m={2} p={2}>
          <Text fontSize="2xl" mb={4} noOfLines={2} textAlign="left">
            {book.title}
          </Text>
          {/* <Flex display="inline"> */}
          <Box display="inline">
            {/* <Rating size={0} ratingValue={book.rating} readonly="true" /> */}
            <Flex mb={4}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star key={value} filled={value <= book.rating} />
              ))}
            </Flex>
            {/* </Flex> */}
          </Box>
          <Text mb={4} maxW="130px" noOfLines={3} textAlign="left">
            {book.review}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

function Star({ filled }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'}/>;
}

export default BookCard;

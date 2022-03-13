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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { API } from 'aws-amplify';
import * as mutations from './graphql/mutations';

// AppSync試験用サンプルデータ
// const postBook = {
//   name: 'Todo 1',
//   description: 'Learn AWS AppSync'
// };

function Card(props) {
  // const { title, longLine, thumbnail, authors, isbn, publishedDate } = props;

  const postReview = {
    ...props,
    review: 'test',
  };

  console.log('Cars has ' + props.title + ' ' + props.longLine + ' ' + props.isbn);

  return (
    <Box
      p={4}
      display={{ md: 'flex' }}
      maxWidth="32rem"
      borderWidth={2}
      margin={2}
      borderColor="gray.300"
      rounded="8"
    >
      <AspectRatio ratio={1 / 1}>
        <Image maxWidth="200px" margin="auto" src={props.thumbnail} alt="sample" />
      </AspectRatio>
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {props.title}
        </Text>
        <Text my={2} color="gray.500">
          {props.longLine}
        </Text>
        {/* <BasicUsage postReview={postReview} /> */}
      </Stack>
    </Box>
  );
}

export default Card;

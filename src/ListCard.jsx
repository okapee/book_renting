import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Box,
  HStack,
  Image,
  List,
  ListItem,
  Input,
  VStack,
  Button,
  Spacer,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { API } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import BookRegistration from './BookRegistration';

function ListCard(props) {
  const book = props.book;

  return (
    <ListItem
      verticalAlign="top"
      bgColor="gray.100"
      borderLeft="solid 6px #1fa67a"
      borderBottom="solid 2px #dadada"
      boxShadow="lg"
      display="flex"
      mb={5}
      p={2}
      position="relative"
    >
      <HStack alignItems="start">
        <Box minW={120} m="auto">
          <Image
            src={book.thumbnail}
            alt=""
            fallbackSrc="https://via.placeholder.com/150"
            borderRadius="xl"
          />
        </Box>
        <Flex>
          <VStack alignItems="start" m={2} justifyContent="space-around">
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              m={2}
              noOfLines={2}
              textAlign="left"
            >
              {book.title}
            </Heading>
            <Box h={100}>
              <Heading
                as="h2"
                size="md"
                mx={2}
                mb={4}
                color="primary.800"
                opacity="0.8"
                fontWeight="normal"
                lineHeight={1.5}
                textAlign="left"
                noOfLines={3}
              >
                {book.description.length > 100
                  ? book.description.slice(0, 100) + '…'
                  : book.description}
              </Heading>
            </Box>
            <Spacer></Spacer>
            <Box>
              <BookRegistration book={book} />
            </Box>
          </VStack>
        </Flex>
      </HStack>
    </ListItem>
  );
}

export default ListCard;

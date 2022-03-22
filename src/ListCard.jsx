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
      borderWidth={1}
      borderColor="gray.300"
      bgColor="gray.100"
      boxShadow="lg"
      display="flex"
      // minW={400}
      p={2}
      position="relative"
    >
      <Flex justifyContent="space-between">
        <HStack alignItems="start">
          <Image
            src={book.thumbnail}
            alt=""
            fallbackSrc="https://via.placeholder.com/150"
            borderRadius="xl"
          />
          <Flex>
            <VStack alignItems="start" m={2} justifyContent="space-around">
              <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                color="primary.800"
                m={2}
                // textAlign={['center', 'center', 'left', 'left']}
                noOfLines={2}
                textAlign="left"
              >
                {book.title}
              </Heading>
              {/* <Spacer></Spacer> */}
              <Box>
                <Heading
                  as="h2"
                  size="md"
                  mx={2}
                  mb={4}
                  color="primary.800"
                  opacity="0.8"
                  fontWeight="normal"
                  lineHeight={1.5}
                  // textAlign={['center', 'center', 'left', 'left']}
                  textAlign="left"
                  noOfLines={3}
                >
                  {book.description.length > 100
                    ? book.description.slice(0, 100) + '…'
                    : book.description}
                </Heading>
              </Box>
              <Spacer></Spacer>
              {/* <Flex justifyContent='space-around'> */}
              <Box>
                <BookRegistration book={book} />
              </Box>
            </VStack>
          </Flex>
        </HStack>
      </Flex>
    </ListItem>
    // </List>
    // </Box>
  );
}

export default ListCard;

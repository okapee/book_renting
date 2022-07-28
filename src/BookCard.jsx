import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
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
  Heading,
  Avatar,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Auth } from 'aws-amplify';

function BookCard(props) {
  const [username, setUserName] = useState('ななし');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();

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
      book.owner,
  );

  return (
    <Box
      p={2}
      m={2}
      rounded="4"
      w={[300, 380]}
      // minW={350}
      bgColor="gray.100"
      boxShadow="md"
      // display="flex"
      onClick={() => {
        console.log('BookCard modal is Open!');
        onOpen();
      }}
      className='boxcard'
    >
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent p={10}>
          <ModalHeader bgColor="gray.100">{book.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={4}>{book.review}</ModalBody>

          <ModalFooter>
            <Button bgColor="orange.300" p={8} mr={3} onClick={onClose}>
              <Text fontSize={'xl'}>閉じる</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack align="start">
        <Image src={book.thumbnail} borderRadius="xl" alignSelf="center" />
        <VStack p={4} align="start">
          <Heading size="lg">{book.title}</Heading>
          <HStack align="start" p={4}>
            <Avatar />
            <Text>{book.owner}</Text>
          </HStack>
          <Flex mb={4}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star key={value} filled={value <= book.rating} />
            ))}
          </Flex>
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

function modalWindow() {
  console.log('BookCard modal is Open!');
}

export default BookCard;

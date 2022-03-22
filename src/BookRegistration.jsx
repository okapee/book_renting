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
  Textarea,
  Spacer,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Auth, API } from 'aws-amplify';
import * as mutations from './graphql/mutations';

function BookRegistration(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [rating, setRating] = useState(5);
  const isError = input === '' || input.length > 280;

  const book = props.book;

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    const loginInfo = await Auth.currentUserInfo();
    const registrationInfo = {
      //   id: book.key,
      title: book.title,
      authors: book.authors,
      //   publisher: book.publisher,
      publishedDate: book.publishedDate,
      postedDate: new Date(),
      longLine: book.description ?? '説明なし',
      isbn:
        book.industryIdentifiers?.[1]?.identifier ||
        book.industryIdentifiers?.[0]?.identifier ||
        '0000000000',
      thumbnail: book.thumbnail,
      review: input,
      rating: rating,
      owner: loginInfo.username,
    };

    // DBへ本情報を登録
    console.log(
      'regisrationInfo: ' +
        registrationInfo +
        ' title: ' +
        book.title +
        ' authors: ' +
        book.authors +
        ' publisher: ' +
        book.publisher +
        ' publishedDate: ' +
        book.publishedDate +
        ' longLine: ' +
        book.description +
        ' isbn: ' +
        registrationInfo.isbn +
        ' thumbnail: ' +
        book.thumbnail +
        ' review: ' +
        input,
    );
    try {
      const newPost = await API.graphql({
        query: mutations.createPost,
        variables: { input: registrationInfo },
      });
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <>
      <Button
        borderRadius={8}
        onClick={onOpen}
        p={6}
        m={4}
        lineHeight="1"
        size="md"
        shadow="lg"
        fontSize={["md", "lg", "xl"]}
        bgColor="gray.300"
        position="absolute"
        right={2}
        bottom={2}
      >
        レビューを登録
      </Button>
      <Modal blockScrollOnMount={false} size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>レビュー投稿画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl isInvalid={isError} wordBreak="normal">
                <FormLabel htmlFor="review">本のレビュー</FormLabel>
                <Textarea
                  id="review"
                  type="text"
                  variant="filled"
                  // placeholder='本のレビューを280文字以内で記載'
                  value={input}
                  onChange={handleInputChange}
                  height={300}
                  flexWrap="normal"
                />
                {!isError ? (
                  <FormHelperText>本のレビューを280文字以内で記載してください。</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    レビューが記載されていない、もしくは280文字を超過しています。
                  </FormErrorMessage>
                )}
              </FormControl>
              <Spacer></Spacer>
              <Text>評価をしてください</Text>
              <StarRating m={10} rating={setRating} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              投稿
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function Star({ filled, onClick }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'} onClick={onClick} />;
}

function StarRating(props, { onChange }) {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => {
    setRating(newRating);
    onChange?.(newRating);
    props.rating(newRating);
  };
  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} onClick={() => changeRating(value)} />
      ))}
    </Flex>
  );
}

export default BookRegistration;

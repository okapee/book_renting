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
  const [rating, setRating] = useState(0);
  const isError = input === '' || input.length > 280 || rating == 0;

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
        // borderRadius={8}
        onClick={onOpen}
        as="a"
        size={['sm']}
        color="#fff"
        borderBottom="5px solid #db9014"
        bgColor="#f39800"
        _before="2px solid rgba(255, 255, 255, .5)"
        _hover={{
          marginTop: '3px',
          borderBottom: '2px solid #db9014',
          bgColor: '#ffa50e',
        }}
        p={6}
        fontSize={['md', 'lg', 'xl']}
        position="absolute"
        right={8}
        bottom={4}
      >
        レビューを登録
      </Button>
      <Modal blockScrollOnMount={false} size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="whiteAlpha.50" backdropFilter="blur(10px) hue-rotate(90deg)" />
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
              <StarRating m={10} setRate={setRating} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit} isDisabled={isError}>
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
  const [inRating, setInRating] = useState(0);
  const changeRating = (newRating) => {
    props.setRate(newRating);
    setInRating(newRating);
    onChange?.(newRating);
    // props.rating(newRating);
    // setRating(newRating)
  };
  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= inRating} onClick={() => changeRating(value)} />
      ))}
    </Flex>
  );
}

export default BookRegistration;

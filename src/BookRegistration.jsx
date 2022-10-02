import { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Flex,
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
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Auth, API } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import * as mutations from './graphql/mutations';

function BookRegistration(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [rating, setRating] = useState(0);
  // Swtich(本の公開する/しない)のfalse/trueを切り替える
  const [value, setValue] = useState(false);
  const isError = input === '' || input.length > 280 || rating == 0;
  const userInfo = useSelector((state) => state.auth.user);

  console.log(`username in BookRegistration.jsx: ${userInfo.username}`);

  const book = props.book;

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    const registrationInfo = {
      title: book.title,
      authors: book.authors,
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
      owner: userInfo.username,
      isPrivate: value,
      type: 't',
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
      toast('登録に成功しました', {
        duration: 4000,
        position: 'left-bottom',
        // Styling
        style: {},
        className: '',
        icon: '🙌',
        style: {
          border: '1px solid #054d41',
          padding: '16px',
          color: '#19b448',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (err) {
      console.log(err);
      // Errorの場合、その旨をトーストとして通知する
      console.log('toast');
      toast('登録に失敗しました', {
        duration: 4000,
        position: 'left-bottom',
        // Styling
        style: {},
        className: '',
        icon: '😭',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#ff0000777',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
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
      <Modal blockScrollOnMount={false} size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="whiteAlpha.50" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader fontSize={['12px', '16px', '20px']}>レビュー投稿画面</ModalHeader>
          <HStack ml={8}>
            <Switch colorScheme="red" mb={4} onChange={() => setValue(!value)} />
            <Text alignSelf="baseline">公開しない(「あなたの本」にのみ表示する)</Text>
          </HStack>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl isInvalid={isError} wordBreak="normal">
                <FormLabel htmlFor="review">本のレビュー</FormLabel>
                <Box className="markdown-layout" display="flex">
                  <VStack w="100vw" minW="250px">
                    <Textarea
                      id="review"
                      className="review-edit"
                      type="text"
                      variant="filled"
                      placeholder="
                        Markdown記法が使えます。&#13;&#10;
                        --------------------&#13;&#10;
                        (例)&#13;&#10;
                        # これはH1タグです&#13;&#10;
                        ## これはH2タグです&#13;&#10;
                        ~~打ち消し線~~&#13;&#10;
                        1. 2. 3. リスト&#13;&#10;
                        - リスト&#13;&#10;
                        [text](url) リンク&#13;&#10;
                        - [ ] タスク1 - [x] タスク2チェックボックス&#13;&#10;
                        ![代替テキスト](画像のURL '画像タイトル') 画像&#13;&#10;
                        "
                      value={input}
                      onChange={handleInputChange}
                      height={300}
                      width="100%"
                      flexWrap="normal"
                    />
                    {!isError ? (
                      <FormHelperText>本のレビューを280文字以内で記載してください。</FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        レビューが記載されていない、もしくは280文字を超過しています。
                      </FormErrorMessage>
                    )}
                  </VStack>
                  <Box className="react-preview">
                    <Box
                      h={300}
                      w="100%"
                      px={4}
                      p={4}
                      ml={4}
                      backgroundColor="azure"
                      overflow="scroll"
                      minW={300}
                      wordBreak="break-word"
                    >
                      <ReactMarkdown className="react-md" remarkPlugins={[remarkGfm]}>
                        {input}
                      </ReactMarkdown>
                    </Box>
                  </Box>
                </Box>
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
      <Toaster />
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

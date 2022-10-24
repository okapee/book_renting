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

function ReviewEdit(props) {
  const book = props.book;
  const setEditFlg = props.setEditFlg;

  console.log(`book: ${book}`);

  const [input, setInput] = useState(book.review);
  const [rating, setRating] = useState();
  const defaultRate = book.rating;
  // Swtich(本の公開する/しない)のfalse/trueを切り替える
  const [value, setValue] = useState(false);
  const isError = input === '' || input.length > 280 || rating == 0;
  const userInfo = useSelector((state) => state.auth.user);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    console.log('handleSubmit in ReviewEdit');
    const registrationInfo = {
      id: book.id,
      //   title: book.title,
      //   authors: book.authors,
      //   publishedDate: book.publishedDate,
      //   postedDate: new Date(),
      //   longLine: book.description ?? '説明なし',
      //   isbn:
      //     book.industryIdentifiers?.[1]?.identifier ||
      //     book.industryIdentifiers?.[0]?.identifier ||
      //     '0000000000',
      //   thumbnail: book.thumbnail,
      review: input,
      rating: rating,
      //   owner: userInfo.username,
      //   isPrivate: value,
      //   type: 't',
    };

    // DBへ本情報を登録

    try {
      const renewPost = await API.graphql({
        query: mutations.updatePost,
        variables: { input: registrationInfo },
      });
      console.log('登録成功');
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
      toast('更新に失敗しました', {
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
    setEditFlg(false);
  };

  return (
    <>
      <VStack>
        <FormControl isInvalid={isError} wordBreak="normal">
          <FormLabel htmlFor="review">編集</FormLabel>
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
          </Box>
        </FormControl>
        <Spacer></Spacer>
        <Text>評価をしてください</Text>
        <StarRating m={10} setRate={setRating} defaultRate={defaultRate} />
        <Button
          mt={2}
          paddingLeft={2}
          paddingRight={2}
          textColor="white"
          bgColor="black"
          loadingText="保存中"
          onClick={handleSubmit}
          isDisabled={isError}
          //   isLoading={formState.isSubmitting}
          type="submit"
        >
          <Text>完了</Text>
        </Button>
      </VStack>
      <Toaster />
    </>
  );
}

function Star({ filled, onClick }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'} onClick={onClick} />;
}

function StarRating(props, { onChange }) {
  const [inRating, setInRating] = useState(props.defaultRate);
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

export default ReviewEdit;

import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Divider,
  Input,
  Textarea,
  ListItem,
  List,
  IconButton,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillBookFill } from 'react-icons/bs';
import { BiMessageEdit } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { listComments, getUser } from './graphql/queries';
import { createComment, deleteComment, deletePost } from './graphql/mutations';
import { formatDistance, format } from 'date-fns';
import { ja } from 'date-fns/locale';

import ReviewEdit from './ReviewEdit';

export default function BookDetail(props) {
  const username = useSelector((state) => state.auth.user.username);
  const userdata = useSelector((state) => state.userDataSlice.userdata);
  const book = {
    ...props.bookInfo,
  };
  const bookReview = props.bookReview;
  const setBookReview = props.setBookReview;
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initCount, setInitCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [comments, setComments] = useState([]);
  const [editFlg, setEditFlg] = useState(false);

  const subscriberId = book.owner;
  let endpoint =
    'https://api.ravenhub.io/company/E9Ormu9DLP/subscribers/' + subscriberId + '/events/9BlvencO4a';

  const finalRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
    reset,
  } = useForm({ criteriaMode: 'all' });

  useEffect(() => {
    console.log(`useEffect in BookDetail`);
    // 関連するコメントを取得する
    async function fn() {
      const filter = {
        bookId: {
          eq: book.id,
        },
      };
      const res = await API.graphql(graphqlOperation(listComments, { filter: filter }));
      console.dir(res);
      setComments(res.data.listComments.items);
      console.log(`comments in useEffect: ${typeof comments}`);
    }
    fn();
  }, []);

  // Inputに入力してボタンを押したときのハンドラ
  const onSubmit = async (data) => {
    console.log('onSubmit in Comments');
    const variables = {
      bookId: book.id,
      comment: data.comment,
      commentby: username,
    };
    console.dir(data);
    const res_create_comment = await API.graphql({
      query: createComment,
      variables: { input: variables },
    });
    // setComments([...comments, res_create_comment]);
    const filter = {
      bookId: {
        eq: book.id,
      },
    };
    const res = await API.graphql(graphqlOperation(listComments, { filter: filter }));
    console.dir(res);

    // Notification通知
    if (res != null) {
      console.log(
        'notification: to:' +
          endpoint +
          ', user:' +
          userdata.name +
          ', postId:' +
          book.title +
          ', sendTo:' +
          book.owner,
      );
      axios.post(
        endpoint,
        { user: userdata.name, postId: book.title },
        {
          headers: { 'Content-type': 'application/json' },
        },
      );
    }
    setComments(res.data.listComments.items);
    reset();
  };

  // 編集ボタンを押下した際に発火するイベント
  function onEditClick() {
    console.log('編集ボタンが押された。');
    setEditFlg(!editFlg);
    console.log('editFlg: ' + editFlg);
  }

  // モーダル表示時にInputからフォーカスを外す
  ref.current?.blur();

  return (
    <>
      <ModalOverlay />
      <ModalContent p={4} minHeight="200px">
        <ModalHeader bgColor="gray.100">
          <HStack>
            <BsFillBookFill size="2rem" />
            <Text marginLeft="1.5rem">{book.title}</Text>
          </HStack>
        </ModalHeader>
        <ModalBody p={2}>
          <HStack justifyContent="space-between">
            <Text as="b" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              レビュー
            </Text>
            <HStack>
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {format(Date.parse(book.postedDate), 'yyyy年M月d日', {
                  locale: ja,
                })}
              </Text>
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                by {book.user?.name ? book.user?.name : book.owner}
              </Text>
              {/* 自分のPostの場合のみEditアイコンを表示 */}
              {book.owner == username ? (
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<AiFillEdit />}
                  onClick={onEditClick}
                />
              ) : (
                <></>
              )}
            </HStack>
          </HStack>
          <Box className="review-disp">
            {editFlg ? (
              <ReviewEdit book={book} setEditFlg={setEditFlg} setBookReview={setBookReview} />
            ) : (
              <ReactMarkdown className="react-md">{bookReview}</ReactMarkdown>
            )}
          </Box>
          <Divider mt={4} mb={4} />
          <Text as="b">コメント</Text>
          <List alignItems="flex-start">
            {comments?.map((comment) => {
              return (
                // keyとindexを渡し、indexを用いてコメント削除した際に再レンダリングする
                <Comment
                  key={comment?.id}
                  bookId={book.id}
                  commentId={comment?.id}
                  commentby={comment?.commentby}
                  comment={comment?.comment}
                  commentdate={comment?.createdAt}
                  userId={username}
                  comments={comments}
                  setComments={setComments}
                />
              );
            })}
          </List>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'right' }}>
            <Textarea
              {...register('comment', {
                required: '入力が必須です',
                minLength: {
                  value: 8,
                  message: '8文字以上入力してください。',
                },
                maxLength: {
                  value: 100,
                  message: '100文字以内で入力してください。',
                },
              })}
              style={{ width: '100%', border: 'groove' }}
              //   ref={ref}
            />
            {errors.comment?.type === 'required' && (
              <Text color="red">{errors.comment?.message}</Text>
            )}
            {errors.comment?.type === 'minLength' && (
              <Text color="red">{errors.comment?.message}</Text>
            )}
            {errors.comment?.type === 'maxLength' && (
              <Text color="red">{errors.comment?.message}</Text>
            )}
            <Button
              mt={2}
              paddingLeft={2}
              paddingRight={2}
              textColor="white"
              bgColor="black"
              loadingText="送信中"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              <Text>送信</Text>
            </Button>
          </form>
        </ModalBody>

        <ModalFooter paddingRight="unset" paddingBottom="unset">
          <DeleteBtn
            postId={book.id}
            update={update}
            forceUpdate={setUpdate}
            owner={book.owner}
            username={username}
          />
          <Button colorScheme="orange" p={4} mr={2} size={['xs', 'sm']} onClick={props.onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

function modalWindow() {
  console.log('BookCard modal is Open!');
}

function DeleteBtn(props) {
  // console.log(`update in DeleteBtn: ${update}`);
  if (props.owner == props.username) {
    // const fu = props.forceUpdate;
    console.log(`update in DeleteBtn: ${props.update}`);
    return (
      <Button
        colorScheme="red"
        p={4}
        mr={2}
        size={['xs', 'sm']}
        onClick={async () => {
          console.log('デリートポストが押された');
          const input = {
            id: props.postId,
          };

          await API.graphql(graphqlOperation(deletePost, { input }));
          console.log('start update: ' + props.update);
          // Postを削除した際に強制リロード
          window.location.reload();
          console.log('finish update: ' + props.update);
        }}
      >
        削除
      </Button>
    );
  } else {
    return <></>;
  }
}

function Comment(props) {
  const { bookId, commentId, commentby, comment, commentdate, userId, setComments } = props;
  const [username, setUserName] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  async function onCmtDelete() {
    console.log(`onCmtDeleteが押された。commentId: ${commentId}`);
    console.dir(props.comments);
    const input = {
      id: commentId,
    };
    const res = await API.graphql({
      query: deleteComment,
      variables: { input: input },
    });

    const filter = {
      bookId: {
        eq: bookId,
      },
    };
    const res_cmt = await API.graphql(graphqlOperation(listComments, { filter: filter }));
    console.dir(res);
    setComments(res_cmt.data.listComments.items);
  }

  console.log(
    `In Comment, comment: ${comment}, commentby: ${commentby}, commentdate: ${commentdate}`,
  );

  // comment毎のユーザー名とAvator画像を取得
  useEffect(() => {
    async function fetchdata() {
      const user = await API.graphql({
        query: getUser,
        variables: {
          userId: commentby,
        },
      });
      console.log(`user in Comment: ${user.data.getUser.name}`);
      setUserName(user.data.getUser.name);
    }
    fetchdata();
  }, []);

  useEffect(() => {
    async function s3fetch() {
      const tmp = await Storage.get(commentby);
      console.log(`Avatar's url: ${tmp}`);
      setImgSrc(tmp);
    }
    s3fetch();
  });

  return (
    <ListItem
      borderWidth="1px"
      p="4"
      mt="2"
      mb="4"
      bg="white"
      borderRadius="md"
      borderColor="gray.300"
    >
      <HStack justifyContent="space-around">
        <VStack flexBasis="10%">
          <Avatar src={imgSrc} />
          <Text fontSize="sm">{username}</Text>
        </VStack>
        <VStack flexBasis="80%" paddingLeft={4} alignItems="flex-start" alignSelf="flex-start">
          <Text fontSize="sm">投稿日: {commentdate.slice(0, 10)}</Text>
          <Text fontSize="sm" ml={4}>
            {comment}
          </Text>
        </VStack>
        {commentby == userId ? (
          <Box width="2rem">
            <TiDeleteOutline color="red" onClick={onCmtDelete} />
          </Box>
        ) : (
          <Box width="2rem"></Box>
        )}
      </HStack>
    </ListItem>
  );
}

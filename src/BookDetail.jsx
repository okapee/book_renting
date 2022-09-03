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
} from '@chakra-ui/react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { listComments } from './graphql/queries';
import { createComment } from './graphql/mutations';

export default function BookDetail(props) {
  //   let comments = [];
  const username = useSelector((state) => state.auth.user.username);
  const userdata = useSelector((state) => state.userDataSlice.userdata);
  //   const [dispCmt, setDispCmt] = useState('初期値');
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initCount, setInitCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [comments, setComments] = useState([]);

  const finalRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
    reset,
  } = useForm();

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
      console.log(`comments in useEffect: ${typeof(comments)}`);
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
    // setComments(comments.append(data.comment));
    const res_create_comment = await API.graphql({
      query: createComment,
      variables: { input: variables },
    });
    // setComments(...comments, )
    console.log('res_create_comment: ');
    console.dir(res_create_comment);
    reset();
  };

  // モーダル表示時にInputからフォーカスを外す
  ref.current?.blur();

  const book = {
    ...props.bookInfo,
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent p={4} minHeight="200px">
        <ModalHeader bgColor="gray.100">{book.title}</ModalHeader>
        <ModalBody p={2}>
          <Text>{book.review}</Text>
          <Divider mt={4} mb={4} />
          <Text as="b">コメント</Text>
          <List>
            {comments?.map((comment) => {
              return <Comment commentby={comment?.commentby} comment={comment?.comment} />;
            })}
          </List>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'right' }}>
            <Textarea
              {...register('comment')}
              style={{ width: '100%', border: 'groove' }}
              //   ref={ref}
            />
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

          await API.graphql(graphqlOperation(mutations.deletePost, { input }));
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
  const { commentby, comment } = props;
  console.log(`In Comment, comment: ${comment}, commentby: ${commentby}`);
  return (
    <ListItem borderWidth="1px" p="4" mt="2" mb="4" bg="white" borderRadius="md" borderColor="gray.300">
      <HStack>
        <VStack>
          <Avatar />
          <Text fontSize="sm">{commentby}</Text>
        </VStack>
        <Box>
          <Text fontSize="sm" ml={4}>
            {comment}
          </Text>
        </Box>
      </HStack>
    </ListItem>
  );
}

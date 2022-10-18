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
  Divider,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import BookDetail from './BookDetail';
import LikeButton from './components/LikeButton';
import { useForm } from 'react-hook-form';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

function BookCard(props) {
  let comments = [];
  const username = useSelector((state) => state.auth.user.username);
  const userdata = useSelector((state) => state.userDataSlice.userdata);
  const [comment, setComment] = useState();
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initCount, setInitCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [imgsrc, setImageSrc] = useState('');
  const finalRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
  } = useForm();
  // Inputに入力してボタンを押したときのハンドラ
  const onSubmit = (data) => {
    console.log('onSubmit Enter!');
    console.log(`データ: ${data.comment}`);
    console.log(`エラー: ${errors.comment}`);
    // setComment(data.comment);
    // reset();
  };

  // モーダル表示時にInputからフォーカスを外す
  ref.current?.blur();

  const book = {
    ...props.bookInfo,
  };

  console.log(
    'Cards has ' +
      book.id +
      ' ' +
      book.title +
      ' ' +
      // book.longLine +
      // ' ' +
      // book.isbn +
      // ' review: ' +
      // book.review +
      ' rating: ' +
      book.rating +
      ' owner: ' +
      book.owner +
      ' username: ' +
      username,
  );

  (async () => {
    console.log(`BookCard内のAvatarにsrc=${book.owner}が設定された`);
    const tmp = await Storage.get(book.owner);
    console.log(`Avatar's url: ${tmp}`);
    setImageSrc(tmp);
  })();

  // いいねの初期表示カウントを取得
  useEffect(() => {
    const get_variables = {
      id: book.id,
    };
    const create_variables = {
      id: book.id,
      count: 0,
    };

    async function fn() {
      const res_like = await API.graphql(graphqlOperation(queries.getLike, get_variables));
      console.log(`getLike by id: ${book.id} in BookCard: ${res_like.data.getLike}`);
      // もし本のIDに対応するLikeオブジェクトがなければ作ってres_likeに詰める
      if (!res_like.data.getLike) {
        console.log('getLike if');
        const res_create_like = await API.graphql({
          query: mutations.createLike,
          variables: { input: create_variables },
        });
        setInitCount(0);
        // initCount = 0;
      } else {
        setInitCount(res_like.data.getLike.count);
        // initCount = res_like.data.getLike.count;
      }
      console.log(`initCount in BookCard: ${initCount}`);
    }
    fn();
  }, []);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="4xl"
      >
        <BookDetail bookInfo={book} onClose={onClose} />
      </Modal>
      <Box
        p={4}
        rounded="4"
        w={[340, 380]}
        h="220px"
        display="grid"
        alignContent="center"
        bgColor="gray.100"
        boxShadow="md"
        position="relative"
        onClick={() => {
          console.log('BookCard modal is Open!');
          onOpen();
        }}
        wordBreak="break-word"
        className="boxcard"
      >
        <Box>
          <HStack>
            <Image src={book.thumbnail} borderRadius="xl" alignSelf="center" />
            <VStack p={4} align="start" alignSelf="flex-start">
              <Heading size="lg" noOfLines={1}>
                {book.title}
              </Heading>
              <HStack align="start" p={4}>
                <Avatar src={imgsrc} />
                {console.log(`${book.user?.name} : New`)};
                <Text noOfLines={1}>{book.user?.name ? book.user?.name : book.owner}</Text>
              </HStack>
              <Flex mb={4}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star key={value} filled={value <= book.rating} />
                ))}
              </Flex>
              <Text mb={4} noOfLines={2}>
                {book.review}
              </Text>
              {console.log(`${initCount} in front of LikeButton`)};
              <LikeButton
                bookId={book.id}
                initCount={initCount}
                setInitCount={setInitCount}
                pressby={[]}
              />
            </VStack>
          </HStack>
        </Box>
      </Box>
    </>
  );
}

function Star({ filled }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'} />;
}

function modalWindow() {
  console.log('BookCard modal is Open!');
}

export default BookCard;

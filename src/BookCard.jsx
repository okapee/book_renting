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
import LikeButton from './components/LikeButton';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

function BookCard(props) {
  const username = useSelector((state) => state.auth.user.username);
  const userdata = useSelector((state) => state.userDataSlice.userdata);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [update, setUpdate] = useState(false);
  const [imgsrc, setImageSrc] = useState('');
  const finalRef = useRef();

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
    // let input = {}
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
      }
    }
    fn();
  }, []);

  return (
    <Box
      p={4}
      rounded="4"
      w={[340, 380]}
      h="200px"
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
        <ModalContent p={4} minHeight="200px">
          <ModalHeader bgColor="gray.100">{book.title}</ModalHeader>
          <ModalBody p={4}>{book.review}</ModalBody>

          <ModalFooter paddingRight="unset" paddingBottom="unset">
            <DeleteBtn
              postId={book.id}
              update={update}
              forceUpdate={setUpdate}
              owner={book.owner}
              username={username}
            />
            <Button colorScheme="orange" p={4} mr={2} size={['xs', 'sm']} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        <HStack>
          <Image src={book.thumbnail} borderRadius="xl" alignSelf="center" />
          <VStack p={4} align="start" alignSelf="flex-start">
            <Heading size="lg" noOfLines={1}>
              {book.title}
            </Heading>
            <HStack align="start" p={4}>
              <Avatar src={imgsrc} />
              <Text>{book.user?.name ? book.user?.name : book.owner}</Text>
            </HStack>
            <Flex mb={4}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star key={value} filled={value <= book.rating} />
              ))}
            </Flex>
            <Text mb={4} noOfLines={2}>
              {book.review}
            </Text>
            <LikeButton initCount={1} pressby={[]} />
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

function Star({ filled }) {
  return <FaStar color={filled ? 'orange' : 'lightgray'} />;
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

export default BookCard;

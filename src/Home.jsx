import {
  Text,
  Box,
  useColorMode,
  HStack,
  VStack,
  Container,
  Button,
} from '@chakra-ui/react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { allbook, sameage, mybook } from './filterSlice';

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [books, setBooks] = useState([]);

  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const buttons = ['みんなの本', '自分に属性が似ている人の本', '自分の本'];
  const labelToAction = {
    みんなの本: 'allbook',
    自分に属性が似ている人の本: 'sameage',
    自分の本: 'mybook',
  };

  let user = '';
  let loginInfo = '';
  (async () => {
    loginInfo = await Auth.currentAuthenticatedUser();
    console.log('HOMEのusername: ' + loginInfo.username);
    user = loginInfo.username;
  })();

  console.log('HOME: ログインしているユーザーは ' + user);

  let fn = () => {};
  // GraphQLフィルター定義
  let mybook_filter = {
    owner: {
      eq: user,
    },
  };

  console.log('Redux Store(HOME)でのfilterの値: ' + filter);

  useEffect(() => {
    switch (filter) {
      case 'sameage':
        fn = async () => {
          console.log('HOME: useEffectでsameageが実行された');
        };
        break;

      case 'mybook':
        fn = async () => {
          console.log('HOME: ' + user + 'でmybookが実行された');
          // const res = await API.graphql(
          //   graphqlOperation(queries.listPosts, {
          //     owner: user
          //   })
          // );
          const mybook_filter = {
            owner: {
              eq: user,
            },
          };
          const res = await API.graphql(
            graphqlOperation(queries.listPosts, { filter: mybook_filter }),
          );

          setBooks(res.data.listPosts.items);
        };
        break;

      default:
        fn = async () => {
          console.log('HOME: useEffectでdefault(allbook)が実行された');
          const res = await API.graphql(graphqlOperation(queries.listPosts));
          setBooks(res.data.listPosts.items);
        };
        break;
    }
    fn();
  }, [filter]);

  return (
    <Container className="container" maxW={1200} minW={300}>
      <VStack m={4}>
        <Box m={4}>
          <Text>ここにはあなたが読んだ本や、みんながおすすめした本が表示されます。</Text>
          {/* <Text>「絞り込みフィルタ」でいろんな条件を指定して表示を変えてみてね!</Text> */}
        </Box>
        {/* <SearchFilter /> */}
        <HStack>
          {/* {buttons.map((buttonLabel, i) => (
            <Button
              size="xl"
              p={[2, 2, 6, 6]}
              borderColor="black.500"
              borderRadius={4}
              boxShadow="md"
              key={i}
              name={buttonLabel}
              onClick={() => dispatch(labelToAction[buttons[i]]())}
            >
              {buttonLabel}
            </Button>
          ))} */}
          <Button
            size="xl"
            p={[2, 2, 6, 6]}
            fontWeight="semibold"
            bg="orange.200"
            borderRadius={4}
            boxShadow="md"
            _hover={{ bg: 'orange.300' }}
            _active={{
              bg: 'orange.300',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
            }}
            _focus={{
              bg: 'orange.300',
              boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={() => dispatch(allbook())}
          >
            みんなの本
          </Button>
          <Button
            size="xl"
            p={[2, 2, 6, 6]}
            fontWeight="semibold"
            bg="orange.200"
            borderRadius={4}
            boxShadow="md"
            _hover={{ bg: 'orange.300' }}
            _active={{
              bg: 'orange.300',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
            }}
            _focus={{
              bg: 'orange.300',
              boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={() => dispatch(sameage())}
          >
            同じ年代の人が読んでいる本(実装中)
          </Button>
          <Button
            size="xl"
            p={[2, 2, 6, 6]}
            fontWeight="semibold"
            bg="orange.200"
            borderRadius={4}
            boxShadow="md"
            _hover={{ bg: 'orange.300' }}
            _active={{
              bg: 'orange.300',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
            }}
            _focus={{
              bg: 'orange.300',
              boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={() => dispatch(sameage())}
          >
            同じ所属の人が読んでいる本(実装中)
          </Button>
          <Button
            size="xl"
            p={[2, 2, 6, 6]}
            fontWeight="semibold"
            bg="orange.200"
            borderRadius={4}
            boxShadow="md"
            _hover={{ bg: 'orange.300' }}
            _active={{
              bg: 'orange.300',
              transform: 'scale(0.98)',
              borderColor: '#bec3c9',
            }}
            _focus={{
              bg: 'orange.300',
              boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={() => dispatch(mybook())}
          >
            あなたの本
          </Button>
        </HStack>
        {/* <Center> */}
        <Box
          p={1}
          // m={2}
          // borderWidth="2px"
          // borderColor="gray.300"
          rounded="4"
          minW={500}
          maxW={1000}
          display="flex"
          justifyContent="space-evenly"
          bgColor="gray.50"
          flexWrap="wrap"
          className="home_contents"
        >
          {books.map((book) => {
            console.log('book: ' + book);
            return <BookCard bookInfo={book} />;
          })}
        </Box>
        {/* </Center> */}
      </VStack>
    </Container>
  );
}

export default Home;

import {
  Text,
  Box,
  Flex,
  useColorMode,
  HStack,
  VStack,
  Container,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { allbook, sameage, sameorg, mybook } from './slices/filterSlice';
import { setUser } from './slices/authSlice';

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [books, setBooks] = useState([]);
  const userdata = useSelector((state) => state.userDataSlice.userdata);

  // ページネーション用
  const [isLoading, setIsLoading] = useState(false);
  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const hasNext = !!nextNextToken;
  const hasPrev = previousTokens.length;
  const limit = 10;

  const filter = useSelector((state) => state.filter.value);

  const dispatch = useDispatch();

  const buttons = ['みんなの本', '自分に属性が似ている人の本', '自分の本'];
  const labelToAction = {
    みんなの本: 'allbook',
    自分に属性が似ている人の本: 'sameage',
    同じ所属の人が読んでいる本: 'sameorg',
    自分の本: 'mybook',
  };

  let fn = () => {};

  console.log('Redux Store(HOME)でのfilterの値: ' + filter);
  const userInfo = useSelector((state) => state.auth.user);

  const private_filter = {
    isPrivate: {
      eq: false,
    },
  };

  useEffect(() => {
    const variables = {
      filter: private_filter,
      limit,
      nextToken,
    };
    switch (filter) {
      case 'sameage':
        fn = async () => {
          console.log('HOME: useEffectでsameageが実行された');
        };
        break;
      case 'sameorg':
        fn = async () => {
          console.log('HOMEでsameorgが実行された');

          const res_posts = await API.graphql(graphqlOperation(queries.listPosts, { filter: private_filter }));
          // console.log('sameorg_listPosts: ' + res_posts.data.listPosts.items[0].user.organization);
          const res_user = await API.graphql(
            graphqlOperation(queries.getUser, { userId: userInfo.username }),
          );
          console.log('sameorg_getUser: ' + res_user.data.getUser.organization);
          const login_user_org = res_user.data.getUser.organization;
          const res_array = res_posts.data.listPosts.items;
          console.log(`res_array in sameorg: ${res_array}`);

          let sameorg_items = [];

          // TODO: postのorganizationとログインユーザーのorganitonを比較して一致するものだけ詰め直す
          res_array.forEach((item) => {
            console.log('res_array.forEach->item: ' + JSON.stringify(item));
            if (item.user?.organization == login_user_org) {
              sameorg_items.push(item);
            }
            console.log(`item.user?.organization: ${item.user}, login_user_org: ${login_user_org}`);
            console.log(`sameorg_items: ${sameorg_items}`);
          });
          setBooks(sameorg_items);
        };
        break;
      case 'mybook':
        fn = async () => {
          console.log('HOME: ' + userInfo?.username + 'でmybookが実行された');
          const mybook_filter = {
            owner: {
              eq: userInfo?.username,
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
          const res = await API.graphql(
            graphqlOperation(queries.listPosts, variables),
          );
          setNextNextToken(res.data.listPosts.nextToken);
          setBooks(res.data.listPosts.items);
        };
        break;
    }
    fn();
  }, [filter, nextToken]);

  const next = () => {
    setPreviousTokens((prev) => [...prev, nextToken]);
    setNextToken(nextNextToken);
    setNextNextToken(null);
  };

  const prev = () => {
    setNextToken(previousTokens.pop());
    setPreviousTokens([...previousTokens]);
    setNextNextToken(null);
  };

  const reset = () => {
    setNextToken(undefined);
    setPreviousTokens([]);
    setNextNextToken(null);
  };

  return (
    <VStack m={4}>
      <Box ml={4}>
        <Text>ここにはあなたが読んだ本や、みんながおすすめした本が表示されます。</Text>
      </Box>
      <HStack>
        <Box display="flex" flexWrap="wrap">
          <Button
            size={['md', 'lg', 'xl']}
            p={[2, 2, 6, 6]}
            m={2}
            fontWeight="semibold"
            fontSize={['md', 'lg', 'xl']}
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
            size={['md', 'lg', 'xl']}
            p={[2, 2, 6, 6]}
            m={2}
            fontWeight="semibold"
            fontSize={['md', 'lg', 'xl']}
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
            size={['md', 'lg', 'xl']}
            p={[2, 2, 6, 6]}
            m={2}
            fontWeight="semibold"
            fontSize={['md', 'lg', 'xl']}
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
            onClick={() => dispatch(sameorg())}
          >
            同じ所属の人が読んでいる本 ({userdata?.organization ? userdata?.organization : '無所属'}
            )
          </Button>
          <Button
            size={['md', 'lg', 'xl']}
            p={[2, 2, 6, 6]}
            m={2}
            fontWeight="semibold"
            fontSize={['md', 'lg', 'xl']}
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
        </Box>
      </HStack>
      <SimpleGrid columns={[1, null, 2]} spacing={8} width='max-content'>
        {books.map((book) => {
          console.log('book: ' + book);
          return <BookCard bookInfo={book} username={userInfo?.username} />;
        })}
      </SimpleGrid>
      <Flex>
        <PageNavigate {...{ hasNext, hasPrev, prev, next, isLoading }} />
      </Flex>
    </VStack>
  );
}

// ページネーション用関数
function PageNavigate({ isLoading, hasNext, hasPrev, next, prev }) {
  const disabledPrev = !hasPrev || isLoading;
  const disabledNext = !hasNext || isLoading;
  return (
    <div className="flex justify-between px-4 py-2 mb-4 text-sm bg-white rounded shadow-md lg:py-4 lg:px-8">
      <Button disabled={disabledPrev} onClick={prev}>
        <span>前へ</span>
      </Button>
      <Button disabled={disabledNext} onClick={next}>
        <span>次へ</span>
      </Button>
    </div>
  );
}

export default Home;

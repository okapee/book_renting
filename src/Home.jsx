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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { allbook, sameage, sameorg, mybook } from './slices/filterSlice';
import { setUser } from './slices/authSlice';
import SocialProfileSimple from './components/profileCard';

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [books, setBooks] = useState([]);
  const [sortDir, setSortDir] = useState('DESC');
  const userdata = useSelector((state) => state.userDataSlice.userdata);

  // ページネーション用
  const [isLoading, setIsLoading] = useState(false);
  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const hasNext = !!nextNextToken;
  const hasPrev = previousTokens.length;
  const limit = 20;

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
      type: 't',
      sortDirection: sortDir,
    };
    switch (filter) {
      case 'sameage':
        fn = async () => {
          let res_array = [];
          console.log('HOME: useEffectでsameageが実行された');
          res_array = await API.graphql(graphqlOperation(queries.sortByDate, variables));
          const login_user_age = userdata.age;
          console.log(`res_array in sameage: ${res_array}`);
          console.log(`age in samesage: ${login_user_age}`);

          let sameage_items = [];
          res_array.data.sortByDate.items.forEach((item) => {
            console.log('res_array.forEach->item: ' + JSON.stringify(item));
            if (item.user?.age == login_user_age) {
              sameage_items.push(item);
            }
            console.log(`item.user?.age: ${item.user}, login_user_age: ${login_user_age}`);
            console.log(`sameorg_items: ${sameage_items}`);
          });

          setNextNextToken(res_array.data.sortByDate.nextToken);
          setBooks(sameage_items);
          // console.log(`確認: ${res.data.sortByDate.items}`);
        };
        break;
      case 'sameorg':
        fn = async () => {
          console.log('HOMEでsameorgが実行された');

          const res_posts = await API.graphql(graphqlOperation(queries.sortByDate, variables));

          const login_user_org = userdata.organization;
          const res_array = res_posts.data.sortByDate.items;

          let sameorg_items = [];

          res_array.forEach((item) => {
            console.log('res_array.forEach->item: ' + JSON.stringify(item));
            if (item.user?.organization == login_user_org) {
              sameorg_items.push(item);
            }
            console.log(`item.user?.organization: ${item.user}, login_user_org: ${login_user_org}`);
            console.log(`sameorg_items: ${sameorg_items}`);
          });

          setNextNextToken(res_posts.data.sortByDate.nextToken);
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
          const variables = {
            filter: mybook_filter,
            limit: 20,
            nextToken,
            type: 't',
            sortDirection: sortDir,
          };
          const res = await API.graphql(graphqlOperation(queries.sortByDate, variables));
          setNextNextToken(res.data.sortByDate.nextToken);
          setBooks(res.data.sortByDate.items);
        };
        break;
      default:
        fn = async () => {
          console.log('HOME: useEffectでdefault(allbook)が実行された');
          console.log(`sortDir: ${sortDir}`);
          const res = await API.graphql(graphqlOperation(queries.sortByDate, variables));
          setNextNextToken(res.data.sortByDate.nextToken);
          setBooks(res.data.sortByDate.items);
          console.log(`確認: ${res.data.sortByDate.items}`);
        };
        break;
    }
    fn();
  }, [filter, nextToken, sortDir]);

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
      <HStack>
        <Text wordBreak='keep-all'>ここにはあなたが読んだ本や、みんながおすすめした本が表示されます。</Text>
        <Menu>
          <MenuButton as={Button} className='sorticon' minW='max-content'>
            並び順
          </MenuButton>
          <MenuList>
            <MenuOptionGroup title="並び順" type="radio">
              <MenuItemOption value="desc" onClick={() => setSortDir('DESC')}>
                降順
              </MenuItemOption>
              <MenuItemOption value="asc" onClick={() => setSortDir('ASC')}>
                昇順
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
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
            同じ年代の人が読んでいる本
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

      <HStack>
        <Box h="100%" w="300px" mr="10px" className="display">
          <VStack>
            <SocialProfileSimple />
            <Box
              w={'100%'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Text
                fontWeight="bold"
                color="#6cb4e4"
                textAlign="center"
                padding="0.25em"
                marginBottom="1em"
                borderTop="solid 2px #6cb4e4"
                borderBottom="solid 2px #6cb4e4"
                background="-webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px,#e9f4ff 3px, #e9f4ff 7px)"
              >
                更新情報
              </Text>
              <ul class="news">
                <li class="new">2022.9.22 サイドバーを設置</li>
                <li class="new">2022.9.20 自己紹介ページ削除</li>
              </ul>
            </Box>
            <Box
              w={'100%'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Text
                fontWeight="bold"
                color="#6cb4e4"
                textAlign="center"
                padding="0.25em"
                marginBottom="1em"
                borderTop="solid 2px #6cb4e4"
                borderBottom="solid 2px #6cb4e4"
                background="-webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px,#e9f4ff 3px, #e9f4ff 7px)"
              >
                投稿者ランキング
              </Text>
              <ol>
                <li>おかぴー</li>
                <li>岡崎優尋</li>
                <li>ぴかお</li>
                <li>高塚佳秀</li>
                <li>都筑</li>
              </ol>
            </Box>
          </VStack>
        </Box>

        <VStack alignItems="start" alignSelf="start">
          <SimpleGrid columns={[1, null, 2]} spacing={8} width="max-content">
            {books.map((book) => {
              console.log('book: ' + book);
              return <BookCard bookInfo={book} username={userInfo?.username} />;
            })}
          </SimpleGrid>
          <Box alignSelf="center">
            <PageNavigate {...{ hasNext, hasPrev, prev, next, isLoading }} />
          </Box>
          <Box>
            <a href="https://px.a8.net/svt/ejp?a8mat=3NJ145+B1PKVM+2PEO+1IB5SX" rel="nofollow">
              <img
                border="0"
                width="90%"
                alt=""
                src="https://www28.a8.net/svt/bgt?aid=220917605668&wid=001&eno=01&mid=s00000012624009122000&mc=1"
              />
            </a>
            <img
              border="0"
              width="1"
              height="1"
              src="https://www17.a8.net/0.gif?a8mat=3NJ145+B1PKVM+2PEO+1IB5SX"
              alt=""
            ></img>
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
}

// ページネーション用関数
function PageNavigate({ isLoading, hasNext, hasPrev, next, prev }) {
  const disabledPrev = !hasPrev || isLoading;
  const disabledNext = !hasNext || isLoading;
  return (
    <Box marginTop={4}>
      <Button disabled={disabledPrev} onClick={prev} marginRight={4}>
        <span>前へ</span>
      </Button>
      <Button disabled={disabledNext} onClick={next}>
        <span>次へ</span>
      </Button>
    </Box>
  );
}

export default Home;

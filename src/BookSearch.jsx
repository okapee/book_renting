import axios from 'axios';
import { Box, HStack, VStack, Spinner, Flex, Center, Text, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BookSearchResult from './BookSearchResult';
import SearchForm from './SearchForm';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dummy = [{ name: 'icon' }, { name: 'check box' }, { name: 'images' }];

  const reQuery = async (query) => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query;
    console.log('query: ' + query);
    await axios.get(url).then((res) => {
      console.log(res);
      setBooks(res.data['items']);
    });
    setIsLoading(false);
  };

  return (
    <VStack margin={4}>
      {console.log('BookSearch.jsx: ' + typeof books)}
      <Box m={4}>
        こちらに登録したい本の名前・キーワードを入力すると自動検出されます！
        あなたのおすすめの一冊を登録してください!
      </Box>
      <SearchForm setQuery={setQuery} reQuery={reQuery} setIsLoading={setIsLoading} />
      <SimpleGrid
        gridTemplateColumns={{
          base: '1fr',
          md: '4fr 1fr',
        }}
        spacing={10}
        paddingTop={10}
      >
        <Box backgroundColor="lightyellow" borderRadius="2%">
          <VStack>
            <Text textAlign="center">ここに検索結果が表示されます。</Text>
            <BookSearchResult books={books} query={query} isLoading={isLoading} />
          </VStack>
        </Box>
        <Box w="100%">
          <VStack>
            {/* <Text>レコメンドエンジン搭載予定地</Text> */}
            <a href="https://px.a8.net/svt/ejp?a8mat=3NJ145+1F7ASY+407E+63WO1" rel="nofollow">
              <img
                border="0"
                width="120"
                height="600"
                alt=""
                src="https://www29.a8.net/svt/bgt?aid=220917605086&wid=001&eno=01&mid=s00000018689001026000&mc=1"
              />
            </a>
            <img
              border="0"
              width="1"
              height="1"
              src="https://www16.a8.net/0.gif?a8mat=3NJ145+1F7ASY+407E+63WO1"
              alt=""
            />
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

export default BookSearch;

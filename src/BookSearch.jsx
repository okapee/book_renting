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
          md: '3fr 1fr',
        }}
        spacing={10}
        paddingTop={10}
      >
        <Box>
          <VStack>
            <Text textAlign="center">ここに検索結果が表示されます。</Text>
            <BookSearchResult books={books} query={query} isLoading={isLoading} />
          </VStack>
        </Box>
        <Box>
          <Center>
            {/* <Text>Recommend!</Text> */}
            <a href="https://rpx.a8.net/svt/ejp?a8mat=3NJ145+JNBQQ+2HOM+BW8O1&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa22091742780_3NJ145_JNBQQ_2HOM_BW8O1%3Fpc%3Dhttps%253A%252F%252Franking.rakuten.co.jp%252Fdaily%252F200446%252F%26m%3Dhttps%253A%252F%252Franking.rakuten.co.jp%252Fdaily%252F200446%252F" rel="nofollow">売れ筋ランキング</a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3NJ145+JNBQQ+2HOM+BW8O1" alt="" />
          </Center>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

export default BookSearch;

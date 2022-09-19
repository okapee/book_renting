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
            <script type="text/javascript" 
              dangerouslySetInnerHTML={{
    __html: `
              var a8='a22091742780_3NJ145_JNBQQ_2HOM_BUB81';var
              rankParam='QMw_U9rlbLEnSfhUbqE4gjE1tLE1sdrvUMsdUgEZneCQuH8Z5';var bannerType='1';var
              bannerKind='item.variable.kind1';var vertical='20';var horizontal='1';var
              alignment='0';var frame='1';var ranking='1';var category='本・雑誌・コミック';
            </script>
            `}} />
            <script type="text/javascript" src="//rws.a8.net/rakuten/ranking.js"></script>
          </Center>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

export default BookSearch;

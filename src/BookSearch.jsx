import axios from 'axios';
import { Box, VStack, Spinner, Flex, Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BookSearchResult from './BookSearchResult';
import SearchForm from './SearchForm';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dummy = [{ name: 'icon' }, { name: 'check box' }, { name: 'images' }];

  // useEffect(() => {
  //   const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query
  //   console.log('query: ' + query);
  //   axios.get(url).then((res) => {
  //     console.log(res);
  //     setBooks(res.data['items']);
  //   });
  // }, []);

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
      <Box>
        <SearchForm setQuery={setQuery} reQuery={reQuery} setIsLoading={setIsLoading} />
        <Text textAlign="center">ここに検索結果が表示されます。</Text>
        <Center>
          <BookSearchResult books={books} query={query} isLoading={isLoading} />
        </Center>
      </Box>
    </VStack>
  );
}

export default BookSearch;

import axios from 'axios';
import { Box, VStack, Flex, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BookSearchResult from './BookSearchResult';
import SearchForm from './SearchForm';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('amazon');

  const dummy = [{ name: 'icon' }, { name: 'check box' }, { name: 'images' }];

  useEffect(() => {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + query ?? 'amazon';
    console.log('query: ' + query);
    axios.get(url).then((res) => {
      // console.log(res.data);
      console.log(res);
      setBooks(res.data['items']);
      // console.log("useEffectが呼ばれた");
    });
  }, [query]);

  return (
    <Container className="container">
      <VStack margin={4}>
        {console.log('BookSearch.jsx: ' + typeof books)}
        <Box mt={4} mb={2} minW={200} maxW={900}>
          こちらに登録したい本の名前・キーワードを入力すると自動検出されます！
          あなたのおすすめの一冊を登録してください!
        </Box>
        <Box w="100%">
          <SearchForm setQuery={setQuery} />
          <BookSearchResult books={books} />
        </Box>
      </VStack>
    </Container>
  );
}

export default BookSearch;

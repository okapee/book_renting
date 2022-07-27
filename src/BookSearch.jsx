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
      console.log(res);
      setBooks(res.data['items']);
    });
  }, [query]);

  return (
      <VStack margin={4}>
        {console.log('BookSearch.jsx: ' + typeof books)}
        <Box m={4}>
          こちらに登録したい本の名前・キーワードを入力すると自動検出されます！
          あなたのおすすめの一冊を登録してください!
        </Box>
        <Box>
          <SearchForm setQuery={setQuery} />
          <BookSearchResult books={books} />
        </Box>
      </VStack>
  );
}

export default BookSearch;

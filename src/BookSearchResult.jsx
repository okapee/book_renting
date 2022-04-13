import {
  Flex,
  Heading,
  Text,
  Box,
  HStack,
  Image,
  List,
  ListItem,
  VStack,
  Button,
  Spacer,
} from '@chakra-ui/react';
import ListCard from './ListCard';

function BookSearchResult(props) {
  const books = props.books;

  console.log('booksearchresult: ' + typeof books);

  return (
    <Box w="100%" p={8} display="flex" bgColor="gray.50" flexWrap="wrap">
      <Text textAlign="left" mb={8}>
        検索結果
      </Text>
      <Spacer></Spacer>
      <List bgColor="whiteAlpha.100" w="100%">
        {Object.entries(books).map(([key, value]) => {
          console.log(key + ' ' + value);
          const book = {};
          book['key'] = key;
          book['title'] = books[key].volumeInfo.title;
          book['authors'] = books[key].volumeInfo.authors;
          book['publisher'] = books[key].volumeInfo.publisher;
          book['publishedDate'] = books[key].volumeInfo.publishedDate;
          book['description'] = books[key].volumeInfo.description ?? '説明なし';
          // book['industryIdentifiers'] = books[key].volumeInfo.industryIdentifiers || 'test'
          book['industryIdentifiers'] = books[key].volumeInfo.industryIdentifiers ?? null;
          book['thumbnail'] = books[key].volumeInfo.imageLinks?.thumbnail;
          console.log('book[title]: ' + book.industryIdentifiers);
          // title = value.volumeInfo.title
          return <ListCard book={book} />;
        })}
      </List>
    </Box>
  );
}

export default BookSearchResult;

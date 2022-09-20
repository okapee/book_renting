import { Text, Box, List, VStack, Spinner, Center, Flex } from '@chakra-ui/react';
import ListCard from './ListCard';
import { useEffect, useState } from 'react';

function BookSearchResult(props) {
  const books = props.books;
  const query = props.query;
  const isLoading = props.isLoading;

  console.log('booksearchresult: ' + query);

  return (
    <>
      {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              mt={10}
            />
      ) : (
        <List bgColor="whiteAlpha.100" w="90%" textAlign='-webkit-center'>
          {Object.entries(books).map(([key, value]) => {
            console.log(key + ' ' + value);
            const book = {};
            book['key'] = key;
            book['title'] = books[key].volumeInfo.title;
            book['authors'] = books[key].volumeInfo.authors;
            book['publisher'] = books[key].volumeInfo.publisher;
            book['publishedDate'] = books[key].volumeInfo.publishedDate;
            book['description'] = books[key].volumeInfo.description ?? '説明なし';
            book['industryIdentifiers'] = books[key].volumeInfo.industryIdentifiers ?? null;
            book['thumbnail'] = books[key].volumeInfo.imageLinks?.thumbnail;
            console.log('book[title]: ' + book.industryIdentifiers);
            return <ListCard book={book} />;
          })}
        </List>
      )}
    </>
  );
}

export default BookSearchResult;

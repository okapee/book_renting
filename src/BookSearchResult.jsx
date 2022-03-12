import { Flex, Heading, Text, Box, HStack, Image, List, ListItem, VStack, Button } from "@chakra-ui/react";
import ListCard from "./ListCard";

function BookSearchResult(props){
    const books = props.books

    console.log('booksearchresult: ' + typeof(books));

    // books.map((book) => {
    //     key=book.key
    //     title=book.volumeInfo.title
    //     thumbnail=book.volumeInfo?.imageLinks?.thumbnail
    //     longLine=book.volumeInfo.description
    //     authors=book.volumeInfo.authors
    //     // isbn={book.volumeInfo?.industryIdentifiers[1]?.identifier}
    //     isbn='123456'
    //     publishedDate=book.volumeInfo.publishedDate
    // });
  return (
      <>
         <Text textAlign='left' m={4}>検索結果</Text>
        { Object.entries(books).map(([key, value]) => {
            console.log(key + ' ' + value);
            const book = {};
            book['key'] = key;
            book['title'] = books[key].volumeInfo.title;
            book['authors'] = books[key].volumeInfo.authors;
            book['publisher'] = books[key].volumeInfo.publisher;
            book['publishedDate'] = books[key].volumeInfo.publishedDate;
            book['description'] = books[key].volumeInfo.description;
            // book['industryIdentifiers'] = books[key].volumeInfo.industryIdentifiers || 'test'
            book['industryIdentifiers'] = books[key].volumeInfo.industryIdentifiers ?? null
            book['thumbnail'] = books[key].volumeInfo.imageLinks.thumbnail;
            console.log('book[title]: ' + book.industryIdentifiers);
            // title = value.volumeInfo.title
            return(<ListCard book={book} />);
            })
        }
    </>
  );
}

export default BookSearchResult;

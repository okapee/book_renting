import axios from "axios";
import { Container, Flex, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BookSearchResult from "./BookSearchResult";
import SearchForm from "./SearchForm";

function BookSearch(){
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("amazon");

const dummy = [
  { name: 'icon' },
  { name: 'check box' },
  { name: 'images' },
];
  
  useEffect(() => {
    const url =
      "https://www.googleapis.com/books/v1/volumes?q=" + query ?? "amazon";
    console.log("query: " + query);
    axios.get(url).then((res) => {
      // console.log(res.data);
      console.log(res);
      setBooks(res.data["items"]);
      // console.log("useEffectが呼ばれた");
    });
  }, [query]);

  return (
   
    <VStack margin={4}>
       {console.log('BookSearch.jsx: ' + typeof(books))}
      <SearchForm setQuery={setQuery} />
      <BookSearchResult books={books} />
    </VStack>
  );
}

export default BookSearch;

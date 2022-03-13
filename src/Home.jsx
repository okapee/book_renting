import {
  Text,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  HStack,
  IconButton,
  ListItem,
  Spacer,
  useColorMode,
  Stack,
  VStack,
  Container,
  Box,
} from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { FaGithub, FaInstagram, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import SearchFilter from './SearchFilter';

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fn = async () => {
      console.log('useEffectが実行された(中)');
      const res = await API.graphql(graphqlOperation(queries.listPosts));
      setBooks(res.data.listPosts.items);
    };
    fn();
  }, []);

  return (
    <VStack m={4}>
      <SearchFilter />
      <Box
        p={1}
        m={4}
        borderWidth="2px"
        borderColor="gray.300"
        rounded="4"
        minW="1000px"
        maxW="1000px"
        display="flex"
        justifyContent="space-around"
        bgColor="gray.50"
        flexWrap="wrap"
      >
        {books.map((book) => {
          console.log('book: ' + book);
          return <BookCard bookInfo={book} />;
        })}
      </Box>
    </VStack>
  );
}

export default Home;

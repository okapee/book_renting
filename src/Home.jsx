import { Text, Button, Flex, GridItem, SimpleGrid, HStack, IconButton, ListItem, Spacer, useColorMode, Stack, VStack, Container } from "@chakra-ui/react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Card from "./Card";

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fn = async() => {
      console.log('useEffectが実行された(中)');
      const res = await API.graphql(graphqlOperation(queries.listPosts));
      setBooks(res.data.listPosts.items);
    }
    fn();
  }, []);

  return (
<VStack margin={4}>
  <Container maxW="80rem" centerContent>
    <SimpleGrid columns={[1, 2, 1, 2]} backgroundColor="teal.50">
      {books.map((book) => {
        return (
        <Card
            key={book.isbn}
            title={book.title}
            thumbnail={book.thumbnail}
            longLine={book.longLine} 
            authors='ああああ'
            // isbn={book.volumeInfo?.industryIdentifiers[1]?.identifier}
            isbn='123456'
            publishedDate={book.publishedDate}
            />
        );
      })}
    </SimpleGrid>
  </Container>
</VStack>
  );
}

export default Home;

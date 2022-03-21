import { Text, Center, useColorMode, VStack, Container, Box } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
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
    <Container maxW={1100}>
      <VStack m={4}>
        <Box m={4}>
          <Text>ここにはあなたが読んだ本や、みんながおすすめした本が表示されます。</Text>
          <Text>
            「絞り込みフィルタ」でいろんな条件を指定して表示を変えてみてね!
          </Text>
        </Box>
        <SearchFilter />
        {/* <Center> */}
          <Box
            p={1}
            // m={2}
            // borderWidth="2px"
            // borderColor="gray.300"
            rounded="4"
            // minW={1 / 3}
            maxW={1000}
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
        {/* </Center> */}
      </VStack>
    </Container>
  );
}

export default Home;

import {
  Text,
  Center,
  Box,
  useColorMode,
  HStack,
  VStack,
  Container,
  Radio,
  BoxRadio,
  RadioGroup,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import SearchFilter from './SearchFilter';
import { useSelector, useDispatch } from 'react-redux';
import { allbook, sameage, mybook } from './filterSlice';

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [books, setBooks] = useState([]);

  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  console.log('Redux Store(HOME)でのfilterの初期値: ' + filter);

  // フィルタリング用のラジオボタンの準備
  const options = ['全ての本', '同年代の人が読んでる本(今後実装予定)', '自分の本'];
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: filter,
    onChange: () => dispatch(value),
  });
  const group = getRootProps();

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
          {/* <Text>「絞り込みフィルタ」でいろんな条件を指定して表示を変えてみてね!</Text> */}
        </Box>
        {/* <SearchFilter /> */}
        <HStack {...group}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <FilteringButton key={value} {...radio}>
                {value}
              </FilteringButton>
            );
          })}
        </HStack>
        {/* <Center> */}
        <Box
          p={1}
          // m={2}
          // borderWidth="2px"
          // borderColor="gray.300"
          rounded="4"
          minW={500}
          maxW={1000}
          display="flex"
          justifyContent="space-evenly"
          bgColor="gray.50"
          flexWrap="wrap"
          className="home_contents"
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

function FilteringButton(props) {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  // console.log('FilteringButtonのstate: ' + state.isChecked);

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default Home;

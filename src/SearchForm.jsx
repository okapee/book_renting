import { Flex, Box, Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';

const SearchForm = (props) => {
  const { setQuery, reQuery, setIsLoading } = props;
  const inputRef = React.createRef();
  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log('SearchForm: ' + inputRef.current.value);
    reQuery(inputRef.current.value);
  };
  return (
    <HStack mb={10} justifyContent="center">
      <Box w="60vw">
        <Input
          ref={inputRef}
          type="text"
          name="name"
          borderColor={'gray.300'}
          placeholder="ここに検索したいキーワードを入力してください。"
          _placeholder={{ color: 'gray.300' }}
          size="md"
          minHeight={14}
          display="block"
          boxSizing='border-box'
        />
      </Box>
      <Button
        p={4}
        borderWidth={2}
        borderColor={'gray.100'}
        fontSize="xl"
        onClick={handleSubmit}
        minHeight={14}
      >
        検索
      </Button>
    </HStack>
  );
};

export default SearchForm;

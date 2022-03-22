import { Flex, Box, Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';

const SearchForm = (props) => {
  const { setQuery } = props;
  const inputRef = React.createRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputRef.current.value) inputRef.current.value = 'Amazon';
    console.log('SearchForm: ' + inputRef.current.value);
    setQuery(inputRef.current.value);
  };
  return (
    // <Box display="flex">
    <HStack mb={10}>
      {/* <Flex w="auto" minW={200}> */}
      <Box w="100%">
        <Input
          ref={inputRef}
          type="text"
          name="name"
          borderColor={'gray.300'}
          placeholder="何も入力しないで検索を押すと'Amazon'で検索したことになります"
          _placeholder={{ color: 'gray.300' }}
          // w="100%"
          size="md"
          // flex={1}
          // flexShrink={2}
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
        // flex={1}
      >
        検索
      </Button>
      {/* </Flex> */}
    </HStack>
    // </Box>
  );
};

export default SearchForm;

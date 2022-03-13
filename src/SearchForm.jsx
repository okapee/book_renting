import { Button, HStack, Input } from "@chakra-ui/react";
import React from "react";

const SearchForm = (props) => {
  const { setQuery } = props;
  const inputRef = React.createRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputRef.current.value) inputRef.current.value = "Amazon";
    console.log("SearchForm: " + inputRef.current.value);
    setQuery(inputRef.current.value);
  };
  return (
    <>
      <HStack mb={10}>
        <Input
          ref={inputRef}
          type="text"
          name="name"
          borderColor={"gray.300"}
          placeholder="何も入力しないで検索を押すと'Amazon'で検索したことになります"
          _placeholder={{ color: "gray.300" }}
          w={700}
          maxW={800}
          minHeight={14}
        />
        <Button p={4} borderWidth={2} borderColor={"gray.100"} fontSize='xl' onClick={handleSubmit} minHeight={14}>検索</Button>
      </HStack>
    </>
  );
};

export default SearchForm;

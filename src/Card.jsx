import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack, Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, VStack, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';

// AppSync試験用サンプルデータ
// const postBook = {
//   name: 'Todo 1',
//   description: 'Learn AWS AppSync'
// };


function Card(props) {
  // const { title, longLine, thumbnail, authors, isbn, publishedDate } = props;

  const postReview = {
    ...props,
    review: 'test'
  }

  console.log('Cars has ' + props.title + ' ' + props.longLine + ' ' + props.isbn);

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={2}
      margin={2}
      borderColor="gray.300"
      rounded="8"
    >
      <AspectRatio ratio={1 / 1}>
        <Image maxWidth="200px" margin="auto" src={props.thumbnail} alt="sample" />
      </AspectRatio>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {props.title}
        </Text>
        <Text my={2} color="gray.500">
          {props.longLine}
        </Text>
        <BasicUsage postReview={postReview} />
      </Stack>
    </Box>
  );
}


function BasicUsage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const [input, setInput] = useState('')
  const isError = (input === '' || input.length > 280)

  const handleInputChange = (e) => setInput(e.target.value)

  const handleSubmit =  async (e) => {
    // DBへ本情報を登録
    console.log(' props.postReview: ' +  props.postReview)
    try{
      const newPost = await API.graphql({ query: mutations.createPost, variables: {input: props.postReview}});
    } catch (err) {
      console.log(err);
    }
  }; 


  return (
    <>
      <Button onClick={onOpen}>投稿する</Button>

      <Modal blockScrollOnMount={false} size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent>
          <ModalHeader>レビュー投稿画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack>
             <FormControl isInvalid={isError} wordBreak='normal'>
               <FormLabel htmlFor='review'>本のレビュー</FormLabel>
              <Input
                id='review'
                type='text'
                variant='filled'
                // placeholder='本のレビューを280文字以内で記載'
                value={input}
                onChange={handleInputChange}
                height={300}
                flexWrap='normal'
              />
              {!isError ? (
                <FormHelperText>
                  本のレビューを280文字以内で記載してください。
                </FormHelperText>
              ) : (
                <FormErrorMessage>レビューが記載されていない、もしくは280文字を超過しています。</FormErrorMessage>
              )}
             </FormControl>
             <StarRating m={10} /> 
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleSubmit}>投稿</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Star({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}

function StarRating({ onChange }) {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => {
    setRating(newRating);
    onChange?.(newRating);
  };
  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </Flex>
  );
}

export default Card;

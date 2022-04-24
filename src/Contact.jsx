import {
  Box,
  ChakraProvider,
  extendTheme,
  Text,
  useDisclosure,
  Flex,
  Heading,
  Stack,
  VStack,
  Button,
  Input,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
  } = useForm();
  // submitしたときの挙動(DB登録)
  const onSubmit = (e) => {
    // e.preventDefault();

    console.log(
      '環境変数 EMAILJS_SERVICE_ID=' +
        EMAILJS_SERVICE_ID +
        '  EMAILJS_TEMPLATE_ID=' +
        EMAILJS_TEMPLATE_ID +
        ' EMAILJS_PUBLIC_KEY=' +
        EMAILJS_PUBLIC_KEY,
    );

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(
        (result) => {
          console.log('EMAILJS success: ' + e);
        },
        (error) => {
          console.log('EMAILJS error: ' + e);
        },
      );
  };

  return (
    <VStack w="100%">
      <Heading as="h1" mt={10} fontSize="3xl">
        お問い合わせ
      </Heading>
      <form ref={form} onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '4%', width: '80%' }}>
        <Flex justify="center" textAlign="center">
          <Box w="100%" p={4} borderRadius="md" shadow="md" bg="gray.50">
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={!!errors.name} isRequired>
                <FormLabel>お名前(必須)</FormLabel>
                <Input placeholder="山田  太郎" {...register('name', { required: true })} />
                <FormErrorMessage>{errors.name && 'お名前を入力してください'}</FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>メールアドレス(必須)</FormLabel>
                <Input placeholder="test@example.com" {...register('email', { required: true })} />
                <FormErrorMessage>
                  {errors.name && 'メールアドレスを入力してください'}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="contents" isInvalid={!!errors.contents}>
                <FormLabel>お問い合わせ内容(必須)</FormLabel>
                <Input
                  placeholder="例） こんにちは"
                  {...register('contents', { required: true })}
                />
                <FormErrorMessage>
                  {errors.contents && 'お問い合わせ内容を入力してください'}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Button
              mt={2}
              mb={10}
              colorScheme="teal"
              loadingText="送信中"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              送信
            </Button>
          </Box>
        </Flex>
      </form>
    </VStack>
  );
}

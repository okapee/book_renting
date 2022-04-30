import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Box, Center, Stack, VStack, HStack } from '@chakra-ui/layout';
import { Heading, Text, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button } from '@chakra-ui/react';
export default function UserInfo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
  } = useForm();
  // submitしたときの挙動(DB登録)
  const onSubmit = (data) => console.log(data);

  return (
    <VStack w="100%">
      <Heading as="h1" mt={10} fontSize="3xl">
        プロフィール編集
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '4%', width: '80%' }}>
        <Flex justify="center" textAlign="center">
          <Box w="100%" p={4} borderRadius="md" shadow="md" bg="gray.50">
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={!!errors.name} isRequired>
                <FormLabel>お名前(必須)</FormLabel>
                <Input placeholder="山田  太郎" {...register('name', { required: true })} />
                <FormErrorMessage>{errors.name && 'お名前を入力してください'}</FormErrorMessage>
              </FormControl>
              <FormControl id="department" isInvalid={!!errors.department}>
                <FormLabel>所属</FormLabel>
                <Input placeholder="A株式会社" {...register('department')} />
              </FormControl>
              <FormControl id="birthyear" isInvalid={!!errors.birthyear} textAlign="start">
                <FormLabel>年代</FormLabel>
                <select {...register('年代')} class="select">
                  <option value="10代">10代</option>
                  <option value="20代">20代</option>
                  <option value="30代">30代</option>
                  <option value="40代">40代</option>
                  <option value="50代">50代</option>
                  <option value="60代">60代</option>
                  <option value="70代">70代</option>
                  <option value="80代">80代</option>
                  <option value="90代">90代</option>
                </select>
                <FormErrorMessage>
                  {errors.contents && 'お問い合わせ内容を入力してください'}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Button
              mt={2}
              mb={10}
              bgColor="orange.400"
              loadingText="送信中"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              <Text fontSize="xl">更新</Text>
            </Button>
          </Box>
        </Flex>
      </form>
    </VStack>
  );
}

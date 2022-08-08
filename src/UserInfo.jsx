import './App.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Box, Center, Stack, VStack, HStack } from '@chakra-ui/layout';
import {
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from '@chakra-ui/react';
import { Auth, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { createUser, updateUser } from './graphql/mutations';
import { isUsernamePasswordOpts } from '@aws-amplify/auth/lib-esm/types';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './graphql/queries';
import toast, { Toaster } from 'react-hot-toast';

import { put, remove, get, pathToImageFile } from './util/s3Util';

import Amplify, { Storage } from 'aws-amplify';
import config from './aws-exports';



Amplify.configure(config);

let file = null;

const notify = (word) => {
  console.log('toast');
  toast(word, {
    duration: 4000,
    position: 'left-bottom',
    // Styling
    style: {},
    className: '',
    // Custom Icon
    icon: '👏',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });
};

function onChange(e) {
  file = e.target.files[0];
}

async function fileUpload() {
  if (file != null) {
    try {
      await Storage.put(file.name, file, {
        contentType: 'image/*', // contentType is optional
      });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
}

export default function UserInfo() {
  const userInfo = useSelector((state) => state.auth.user);
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setState({ profileImg: reader.result });
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, ...formState },
  } = useForm();
  // submitしたときの挙動(DB登録)
  const onSubmit = async (data) => {
    console.log(data);

    try {
      // ユーザーテーブルへ未登録の場合はcreateUser、登録済みの場合はupdateUserを使う
      console.log('userInfo in UserInfo.jsx: ' + userInfo?.username);
      const user = await API.graphql({
        query: getUser,
        variables: {
          userId: userInfo?.username,
        },
      });
      console.log('userInfo user: ' + user);

      if (user.data.getUser == null) {
        console.log('userInfo in createUser');
        const newuser = await API.graphql({
          query: createUser,
          variables: {
            input: {
              userId: userInfo.username,
              organization: data.department,
              age: data.年代,
              name: data.name,
            },
          },
        });
        fileUpload();
        notify('新規登録完了です。');
      } else {
        console.log('userInfo in updateUser');
        await API.graphql({
          query: updateUser,
          variables: {
            input: {
              userId: userInfo.username,
              organization: data.department,
              age: data.年代,
              name: data.name,
            },
          },
        });
        fileUpload();
        notify('更新完了です。');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack w="100%">
      <Heading as="h1" mt={10} mb={10} fontSize="3xl">
        プロフィール編集
      </Heading>

      <div className="img_container">
        <div className="img-holder">
          <img src={profileImg} alt="" id="img" className="img" />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />
        <div className="label">
          <label className="image-upload" htmlFor="input">
            {/* <i className="material-icons">add_photo_alternate</i> */}
            Choose your Photo
          </label>
        </div>
      </div>

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
                <select {...register('年代')} className="select">
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
              mt={10}
              mb={10}
              size={['md']}
              p={[2, 2, 6, 6]}
              fontWeight="semibold"
              fontSize={['md', 'lg', 'xl']}
              textColor="white"
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
      <Toaster />
    </VStack>
  );
}

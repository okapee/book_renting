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
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from './slices/userDataSlice';
import { getUser } from './graphql/queries';
import toast, { Toaster } from 'react-hot-toast';

import Amplify, { Storage } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

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

let fileContent = '';

export default function UserInfo() {
  // store内の値を取得
  const userdata = useSelector((state) => state.userDataSlice.userdata);

  // 表示用の初期値をDBから取得する

  // actionを操作するための関数取得
  const dispatch = useDispatch();
  // 初期状態のユーザー情報を取得(セットはheaderで取得する)

  const userInfo = useSelector((state) => state.auth.user);
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const [fileName, setFileName] = useState();

  useEffect(() => {
    console.log('Enter into switch');
    let select = document.getElementById('age-select');

    switch (userdata?.age) {
      case '10代':
        console.log('10 in switch');
        select.options[0].selected = true;
        break;
      case '20代':
        console.log('20 in switch');
        select.options[1].selected = true;
        break;
      case '30代':
        console.log('30 in switch');
        select.options[2].selected = true;
        break;
      case '40代':
        console.log('40 in switch');
        select.options[3].selected = true;
        break;
      case '50代':
        console.log('50 in switch');
        select.options[4].selected = true;
        break;
      case '60代':
        console.log('60 in switch');
        select.options[5].selected = true;
        break;
      case '70代':
        console.log('70 in switch');
        select.options[6].selected = true;
        break;
      case '80代':
        console.log('80 in switch');
        select.options[7].selected = true;
        break;
      case '90代':
        console.log('90 in switch');
        select.options[8].selected = true;
        break;
      default:
        console.log('default');
        select.options[0].selected = true;
    }
  });

  async function fileUpload() {
    if (profileImg != null) {
      console.log('fileUpload to S3 by ' + userInfo?.username);
      console.log('fileContent: ' + fileContent);
      try {
        await Storage.put(userInfo?.username, fileContent, {
          contentType: 'image/*', // contentType is optional
        });
      } catch (error) {
        console.log('Error uploading file: ', error);
      }
    }
  }

  const imageHandler = (e) => {
    fileContent = e.target.files[0];
    console.log('fileContent in imageHandler: ' + fileContent);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
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
        // ユーザー情報のstoreを更新
        dispatch(
          setUserData({
            userId: userInfo.username,
            organization: data.department,
            age: data.年代,
            name: data.name,
            profileImg: profileImg,
          }),
        );
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
        console.log('dispatch開始');
        dispatch(
          setUserData({
            userId: userInfo.username,
            organization: data.department,
            age: data.年代,
            name: data.name,
            profileImg: profileImg,
          }),
        );
        console.log('dispatch終了');
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
          accept="image/png, image/jpeg"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />
        <div className="label">
          <label className="image-upload" htmlFor="input">
            画像アップロード
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: '4%', width: '80%' }}>
        <Flex justify="center" textAlign="center">
          <Box w="100%" p={4} borderRadius="md" shadow="md" bg="gray.50">
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={!!errors.name} isRequired>
                <FormLabel>お名前(必須)</FormLabel>
                <Input
                  placeholder={userdata?.name ? userdata?.name : '山田太郎'}
                  {...register('name', { required: true })}
                />
                <FormErrorMessage>{errors.name && 'お名前を入力してください'}</FormErrorMessage>
              </FormControl>
              <FormControl id="department" isInvalid={!!errors.department}>
                <FormLabel>所属</FormLabel>
                <Input
                  placeholder={userdata?.organization ? userdata?.organization : 'サンプル株式会社'}
                  {...register('department')}
                />
              </FormControl>
              <FormControl id="birthyear" isInvalid={!!errors.birthyear} textAlign="start">
                <FormLabel>年代</FormLabel>
                <select {...register('年代')} className="select" id="age-select">
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

import './styles.css';
import './index.css';
import {
  Container,
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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import config from './aws-exports';

import Home from './Home';
import BookSearch from './BookSearch';
import UserInfo from './UserInfo';
import About from './About';
import Contact from './Contact';
import NoMatch from './NoMatch';

Amplify.configure(config);

export default function Loggedin() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  //ログイン直後のみidTokenを受け取れずエラーになってしまうため、画面リロードを実行
  try {
    console.log(typeof user.signInUserSession.idToken.jwtToken);
  } catch (e) {
    window.location.reload();
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <div className="App">
      <ChakraProvider
        theme={extendTheme({
          fonts: {
            heading: 'Noto Serif JP',
            body: 'Noto Serif JP',
          },
        })}
      >
        {/* <Flex className="header" w="100%" bgColor="teal.600" p={10} textColor="white" height="40px"> */}

        <Flex w="100%" bgColor="teal.600" p={10} textColor="white" height="100px">
          <Flex align="center" mr={5} minW={100}>
            <Heading as="h1" textSize={['xl', '2xl', '3xl']} mr={10}>
              みんなで本書評
            </Heading>
          </Flex>
          <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
            <HamburgerIcon m={8} />
          </Box>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/">
              <Text
                mr={4}
                fontWeight="bold"
                fontSize={['lg', 'xl', '2xl']}
                _hover={{ bg: 'orange.300' }}
                _focus={{ boxShadow: 'outline' }}
              >
                本の一覧
              </Text>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'undefined')}
              to="/booksearch"
            >
              <Text
                mr={4}
                fontWeight="bold"
                fontSize={['lg', 'xl', '2xl']}
                _hover={{ bg: 'orange.300' }}
                _focus={{ boxShadow: 'outline' }}
              >
                本の登録
              </Text>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'undefined')}
              to="/profile"
            >
              <Text
                mr={4}
                fontWeight="bold"
                fontSize={['lg', 'xl', '2xl']}
                _hover={{ bg: 'orange.300' }}
                _focus={{ boxShadow: 'outline' }}
              >
                プロフィール編集
              </Text>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/about">
              <Text
                mr={4}
                fontWeight="bold"
                fontSize={['lg', 'xl', '2xl']}
                _hover={{ bg: 'orange.300' }}
                _focus={{ boxShadow: 'outline' }}
              >
                目的と作者
              </Text>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'undefined')}
              to="/contact"
            >
              <Text
                mr={4}
                fontWeight="bold"
                fontSize={['lg', 'xl', '2xl']}
                _hover={{ bg: 'orange.300' }}
                _focus={{ boxShadow: 'outline' }}
              >
                お問い合わせ
              </Text>
            </NavLink>
          </Stack>
          <VStack
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            mt={{ base: 4, md: 0 }}
          >
            <Text fontSize={['sm', 'md', 'lg']}>ようこそ {user.username} さん</Text>
            <Button bgColor="orange.400" onClick={signOut} m={4}>
              ログアウト
            </Button>
          </VStack>
        </Flex>

        <Container className="container">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/booksearch" element={<BookSearch />} />
              <Route path="/profile" element={<UserInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <Box className="footer" bg="teal.600">
        powered by okapee
      </Box>
    </>
  );
}

const Layout = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </div>
  );
};

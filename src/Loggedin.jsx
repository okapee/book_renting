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
  HStack,
  Button,
  chakra,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import config from './aws-exports';

import Header from './Header';
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
        <Header signOut={signOut} />
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

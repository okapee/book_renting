import './styles.css';
import './index.css';
import {
  Box,
  ChakraProvider,
  extendTheme,
  Text,
  useDisclosure,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Auth, Amplify, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import config from './aws-exports';

import Home from './Home';
import BookSearch from './BookSearch';
import About from './About';
import NoMatch from './NoMatch';

Amplify.configure(config);

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  // const [username, setUserName] = useState('ななし');

  // (async () => {
  //   loginInfo = await Auth.currentAuthenticatedUser();
  //   console.lot('App.jsxのusername: ' + loginInfo.username);
  //   setUserName(loginInfo.username);
  // })();

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
        <Flex className="header" w="100%">
          <Flex align="center" mr={5} minW={100}>
            <Heading as="h1" size="xl" className="title">
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
          </Stack>
          <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
            {/* <Button
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            >
              Create account
            </Button> */}
            <Text fontSize={['sm', 'md', 'lg']}>ようこそななしさん</Text>
            <AmplifySignOut fontSize={['md', 'lg', 'xl']} />
          </Box>
        </Flex>

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/booksearch" element={<BookSearch />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <Box bg="teal.600" p="8" textAlign="right" textColor={'white'} w="100%">
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

export default withAuthenticator(App);

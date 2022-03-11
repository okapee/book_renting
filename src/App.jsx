import "./styles.css";
import {
  Box,
  Image,
  ChakraProvider,
  Container,
  extendTheme,
  HStack,
  Text,
  Badge,
  Menu,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Grid,
  StackDivider,
  Link,
  Flex,
  Heading,
  Stack
} from "@chakra-ui/react";
import { EmailIcon, HamburgerIcon } from "@chakra-ui/icons";
import React, { Component, useState, useEffect } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import { Amplify, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import config from './aws-exports';
// import '@aws-amplify/ui-react/styles.css';

import Header from "./Header";
import Home from "./Home";
import Body from "./Body";
import BookSearch from "./BookSearch";
import About from "./About";
import NoMatch from "./NoMatch";
import * as mutations from './graphql/queries';


Amplify.configure(config);

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac"
  }
};

const theme = extendTheme({ colors });

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={6}
          bg="teal.500"
          color="white"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              みんなで本書評
            </Heading>
          </Flex>
          <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
            <HamburgerIcon />
          </Box>
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: isOpen ? "block" : "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "undefined")}
              to="/"
            >
              <Text m={2}>Home</Text>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? "active" : "undefined")}
              to="/booksearch"
            >
              <Text m={2}>本検索</Text>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? "active" : "undefined")}
              to="/about"
            >
              <Text m={2}>About</Text>
            </NavLink>
          </Stack>
          <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            >
              Create account
            </Button>
            <AmplifySignOut />
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
      <Box bg="blackAlpha.700" m="2" p="4" textAlign="right" borderRadius="5">
        powered by okapee
      </Box>
    </>
  );
}

const Layout = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Outlet />
    </div>
  );
};

export default withAuthenticator(App);

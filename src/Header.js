import React, { useState, useEffect } from 'react';
import './Header.css';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Amplify, { Auth, API, Storage } from 'aws-amplify';
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
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './slices/authSlice';
import { setUserData } from './slices/userDataSlice';
import * as queries from './graphql/queries';

export default function Header(props) {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [iconURL, setIconURL] = useState('');
  const [iconName, setIconName] = useState('');

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const userdata = useSelector((state) => state.userDataSlice.userdata);

  console.log(`userdata in header.js: ${userdata?.username}`);

  // userdata.profileImg != iconURL の場合、アイコンURLをprofileImgで置き換える
  if (
    userdata?.profileImg !== 'undefined' &&
    userdata?.profileImg !== '' &&
    userdata?.profileImg != iconURL &&
    iconURL != ''
  ) {
    // console.log(`ここにはいった: ${userdata.profileImg}`);
    setIconURL(userdata?.profileImg);
    console.log(`profileImg in S3: ${userdata?.profileImg}`);
  }
 
  console.log('userInfo in header: ' + userInfo);

  useEffect(() => {
    const setUserToStore = async () => {
      const res = await Auth.currentAuthenticatedUser();
      console.log('Headerのusername: ' + res.username);
      dispatch(setUser(res));
      setIconName(res.username);

      const user = await API.graphql({
        query: queries.getUser,
        variables: {
          userId: res.username,
        },
      });
      console.log(
        `user in header [usename: ${res.username}], [organization: ${user.data.getUser.organization}]`,
      );

      if (user != null) {
        console.log('setUserData in header dispatch');
        dispatch(
          setUserData({
            userId: res.username,
            organization: user.data.getUser.organization,
            age: user.data.getUser.age,
            name: user.data.getUser.name,
            profileImg: iconURL,
          }),
        );
      }
    };
    setUserToStore();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const setImage = async () => {
      console.log(`userInfo in useEffect of header.js: ${userInfo?.username}`);
      const url = await Storage.get(userInfo?.username);
      console.log(`url in useEffect of header.js: ${url}`);
      setIconURL(url);
      console.log('iconURL: ' + iconURL);
    };
    setImage();
  }, [userInfo?.username]);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <Link to={'/'}>
        <img src={require('./assets/images/header_logo.png')} className="Logo" alt="logo" />
      </Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/">
            本の一覧
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : 'undefined')}
            to="/booksearch"
          >
            本の登録
          </NavLink>{' '}
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/profile">
            ユーザー情報
          </NavLink>
          {/* <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/about">
            目的と作者
          </NavLink> */}
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/contact">
            お問い合わせ
          </NavLink>
          <Avatar name={iconName} src={iconURL} size="lg" />
          <button onClick={props.signOut}>Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}

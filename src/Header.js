import React, { useState, useEffect } from 'react';
import './Header.css';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';

export default function Header(props) {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

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
      <img
        src={require('./assets/images/header_logo.png')}
        className="Logo"
        alt="logo"
        // width="100%"
        // height="auto"
      />
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
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : 'undefined')}
            to="/profile"
          >
            ユーザー情報
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/about">
            目的と作者
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'undefined')} to="/contact">
            お問い合わせ
          </NavLink>
          <button onClick={props.signOut}>Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}

import React from "react";
import { NavLink, Router } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <HeaderNavItem exact to="/" name="Home" />
      <HeaderNavItem to="/about" name="BookSearch" />
      <HeaderNavItem to="/contact" name="About" />
    </header>
  );
}

function HeaderNavItem(props) {
  return (
    <Router location={""} navigator={undefined}>
      <NavLink
        to={props.to}
        className="nav-item"
        exact={props.exact ? true : false}
        activeClassName="active"
      >
        {props.name}
      </NavLink>
    </Router>
  );
}

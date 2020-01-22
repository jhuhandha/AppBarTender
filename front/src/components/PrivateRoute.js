import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Header from './Header';
import services from './../services/api';

import './../styles/home.css';

const MENU = [
  { name: "Home", path: "/home", role: ["ADMIN", "BARTENDER"] },
  { name: "Drink", path: "/drink", role: ["ADMIN"] },
  { name: "Order", path: "/order", role: ["ADMIN", "BARTENDER"] },
  { name: "Order History", path: "/order/history", role: ["ADMIN"] },
];

export default ({ _component: Component, ...rest }) => {

  let fakeAuth = false;
  // const fakeAuth = useSelector(state => state.login);
  const token = new services().getToken();
  let _token;
  if (token) {
    try {
      _token = jwtDecode(token);
      if (rest.role.indexOf(_token.data.role) != -1) {
        fakeAuth = true;
      }
    }
    catch (e) {
      new services().removeToken();
    }
  }

  return (
    fakeAuth ? (
      <div>
        <Header menu={MENU.filter(e => e.role.indexOf(_token.data.role) != -1)} />
        <div className="container">
          <Route
            {...rest}
            render={() => <Component role={_token.data.role} />}
          />
        </div>
      </div>)
      :
      (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
  )
}

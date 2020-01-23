import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Notifications from 'react-notify-toast';

import { store } from './redux/store';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Order from './pages/Order';
import Drink from './pages/Drink';
import ResultOrder from './pages/ResultOrder';
import OrderHistory from './pages/OrderHistory';

import './App.css';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Notifications />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute exact path="/home" role={["ADMIN", "BARTENDER"]} _component={Home}/>
          <PrivateRoute exact path="/drink" role={["ADMIN"]} _component={Drink}/>
          <PrivateRoute exact path="/order" role={["ADMIN", "BARTENDER"]} _component={Order}/>
          <PrivateRoute exact path="/order/history" role={["ADMIN"]} _component={OrderHistory}/>
          <PrivateRoute exact path="/order/result" role={["ADMIN"]} _component={ResultOrder}/>
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

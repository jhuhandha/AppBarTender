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
import OrderHistory from './pages/OrderHistory';

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
          <PrivateRoute path="/home" role={["ADMIN", "BARTENDER"]} _component={Home}/>
          <PrivateRoute path="/drink" role={["ADMIN"]} _component={Drink}/>
          <PrivateRoute path="/order" role={["ADMIN", "BARTENDER"]} _component={Order}/>
          <PrivateRoute path="/order/history" role={["ADMIN"]} _component={OrderHistory}/>
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

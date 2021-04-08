import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import './App.css';
import Store from './components/Store/Store';
import Header from './components/Header/Header';
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import LogIn from "./components/LogIn/LogIn";
import NoMatch from "./components/NoMatch/NoMatch";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Cart from "./components/Cart/Cart";

export const UserContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider  value= {[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/store">
            <Store></Store>
          </Route>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/cart/book/:bookId">
            <Cart></Cart>
          </PrivateRoute>
          <Route exact path="/">
            <Store></Store>
          </Route>
          <Route exact path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
     
    </UserContext.Provider>
  );
}

export default App;

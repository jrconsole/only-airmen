import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import UserProfile from '../UserProfile/UserProfile';
import Chat from '../Chat/Chat';
import Conversation from '../Conversation/Conversation';
import Search from '../Search/Search';
//import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <>
      <Router>
        <div>
          {/*<NavBar />*/}

          <Switch>
            <Route exact path="/">
              {/*insert logic for login status. ex/ if logged in, render user profile*/}
              <Login  />
            </Route>
            <Route exact path="/registration">
              {/*insert logic for login status. ex/ if logged in, render user profile*/}
              <Registration />
            </Route>
            <Route path="/user/:id"> {/*will need to update path with params. ex/ path="/user/:id">*/}
              <UserProfile />
            </Route>
            <Route path="/conversations"> {/*will need to plan how to access conversations*/}
              <Chat />
            </Route>
            <Route path="/conversation"> {/*will need to update path with params. ex/ path="/conversation/:id">*/}
              <Conversation />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

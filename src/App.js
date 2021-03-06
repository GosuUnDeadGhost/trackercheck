import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Tracker from './tracker/tracker.js';
import Home from './home/home.js';
import Login from './login/login.js';
import PrivateRoute from './privateRoute';
import { onLogin } from './actions/login';

import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    if (localStorage.getItem('login')){
        this.props.onLogin(JSON.parse(localStorage.getItem('login')));
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Tracker Check</h1>
          <ul className="header">
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/tracker">Трекер</NavLink></li>

            { !this.props.isLogin ? <li><NavLink to="/login">Login</NavLink></li> : <li><NavLink to="/login">Logout ({this.props.username})</NavLink></li>}
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/tracker" component={Tracker} isLogin={this.props.isLogin} />
            <Route path="/login" component={Login}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.login.isLogin,
    username: state.login.username,
  }),
  dispatch => ({
    onLogin: (data) => {
      dispatch(onLogin(data));
    }
  })
)(App);

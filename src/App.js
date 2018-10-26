import React, { Component } from 'react';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Tracker from './tracker/tracker.js';
import Home from './home/home.js';

import './App.css';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Tracker Check</h1>
          <ul className="header">
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/tracker">Трекер</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/tracker" component={Tracker}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './login.css';

import { connect } from 'react-redux';
import { onLogin } from '../actions/login'

class Login extends Component {
  state = { redirectToReferrer: false };
  constructor() {
    super();

    this.state = {
      login: '',
      password: ''
    }
  }

  handleChange = (e) => {
   this.setState({[e.target.name]: e.target.value})
  }

  onLogin = () => {
    this.props.onLogin({
      login: this.state.login,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div>
        <input type="text" name="login" value={this.state.login} onChange={(e) => this.handleChange(e)} />
        <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
        <button onClick={this.onLogin}>Log in</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    isLogin: state.isLogin
  }),
  dispatch => ({
    onLogin: (data) => {
      dispatch(onLogin(data));
    }
  })
)(Login);

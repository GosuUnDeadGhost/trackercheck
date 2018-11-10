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
    };
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

  onLogout = () => {
    this.setState({'login': ''});
    this.setState({'password': ''});
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        { !this.props.isLogin ?
          <div>
            <input type="text" name="login" value={this.state.login} onChange={(e) => this.handleChange(e)} />
            <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />,
            <button onClick={this.onLogin}>Log in</button>
          </div>
         : <button onClick={this.onLogout}>Log out</button>
        }

      </div>
    )
  }
}

export default connect(
  state => ({
    isLogin: state.login.isLogin,
  }),
  dispatch => ({
    onLogin: (data) => {
      dispatch(onLogin(data));
    },
    onLogout: (data) => {
      dispatch({'type': 'FETCH_ON_LOGOUT_SUCCESS'});
    }
  })
)(Login);

import React, { Component } from 'react';
import './login.css';

import { connect } from 'react-redux';
import { onLogin } from '../actions/login'

import BlockUi from 'react-block-ui';

const LOGIN_ERROR = "Не верная комбинация логин/пароль";

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

  onLogin = (e) => {
    e.preventDefault();
    this.props.onLogin({
      login: this.state.login,
      password: this.state.password,
    });
    //this.props.history.push('/');
  }

  onLogout = () => {
    this.setState({'login': ''});
    this.setState({'password': ''});
    this.props.onLogout();
  }

  // {
  //   (this.props.login.loading) ? <img src={loader} className="loader"/> : ""
  // }

  render() {
    return (
      <div>
        { (this.props.login.isLogin)
          ?
            <button onClick={this.onLogout}>Log out</button>
          :
          [
            <BlockUi tag="div" blocking={this.props.login.loading} key={0}>
              <div key={1}>
                <form autoComplete='on' method="POST" onSubmit={this.onLogin}>
                  <div className="raw">
                    <label>
                      <div className="col-12">
                        Login:
                      </div>
                      <div className="col-12">
                        <input type="text" name="login" value={this.state.login} onChange={(e) => this.handleChange(e)} />
                      </div>
                    </label>
                  </div>
                  <div className="raw">
                    <label>
                      <div className="col-12">
                        Password:
                      </div>
                      <div className="col-12">
                        <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                      </div>
                    </label>
                  </div>
                  <div className="raw">
                    <div className="col-12">
                      <input type="submit" value="Login" />
                    </div>
                  </div>
                </form>
              </div>
            </BlockUi>,
            (this.props.login.hasOwnProperty('isLogin') && !this.props.login.isLogin)
              ? LOGIN_ERROR
              : ""
            ]
        }

      </div>
    )
  }
}

export default connect(
  state => ({
    login: state.login,
    //isLogin: state.login.isLogin,
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

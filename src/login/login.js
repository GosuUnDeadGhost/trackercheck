import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor() {
    super();
    
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div>
        <input type="text" name="login" />
        <input type="text" name="password" />
      </div>
    )
  }
  
}

export default Login;
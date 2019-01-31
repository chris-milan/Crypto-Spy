import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Login extends Component {
  LoginHandler() {
    console.log('Login was clicked');
  }

  render() {
    return (
      <div>
        <Link
          className="nav-link headerButtons"
          to="/login"
          onClick={this.LoginHandler}
        >
          Login
        </Link>
      </div>
    );
  }
}

export default Login;

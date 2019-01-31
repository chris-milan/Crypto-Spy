import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  SignupHandler() {
    console.log('Signup was clicked');
  }

  render() {
    return (
      <div className="nav-item">
        <Link className="nav-link headerButtons" to="/register">
          Sign Up
        </Link>
      </div>
    );
  }
}

export default Signup;

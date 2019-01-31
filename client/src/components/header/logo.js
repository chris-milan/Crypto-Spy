import React, { Component } from 'react';
import './header.css';

class Logo extends Component {
  LogoHandler() {
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        <div className="logo" onClick={this.LogoHandler}>
          #CryptoSpy
        </div>
        <div className="logoLine" />
      </div>
    );
  }
}

export default Logo;

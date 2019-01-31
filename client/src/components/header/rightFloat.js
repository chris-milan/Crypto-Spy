import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Signup from './signup';
import Login from './login';
import './header.css';

class RightFloat extends Component {
  state = {
    onDashboard: false
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  goToDashboard(e) {
    e.preventDefault();
    window.location.href = '/dashboard';
  }

  goToHome(e) {
    e.preventDefault();
    window.location.href = '/';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const checkURL = () => {
      localStorage.setItem('cbuzz_urlLocation', window.location.href);
      const urlLocation = localStorage.getItem('cbuzz_urlLocation');
      if (urlLocation[urlLocation.length - 1] === 'd') {
        this.setState({
          onDashboard: true
        });
      } else {
        this.setState({
          onDashboard: false
        });
      }
    };

    setTimeout(checkURL, 1);

    const dashboard = (
      <a
        className="home-dashboard headerButtons"
        href=""
        onClick={this.goToDashboard.bind(this)}
      >
        Dashboard
      </a>
    );

    const home = (
      <a
        className="home-dashboard headerButtons"
        href=""
        onClick={this.goToHome.bind(this)}
      >
        Home
      </a>
    );

    const authLinks = (
      <div>
        <div className="leftFloat">
          {this.state.onDashboard ? home : dashboard}
        </div>
        <div className="rightFloat headerButtons">
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You need Gravatar hooked up to your email to have your image displayed."
            />{' '}
            Logout
          </a>
        </div>
      </div>
    );

    const guestLinks = (
      <div>
        <div className="leftFloat">
          <Signup />
        </div>
        <div className="rightFloat">
          <Login />
        </div>
      </div>
    );

    return (
      <div className="col">
        <div className="rightFloat">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    );
  }
}

RightFloat.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(RightFloat);

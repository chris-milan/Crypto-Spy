import React, { Component } from 'react';
import { generatePath } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from './actions/homeActions';
import { fetchCoinData } from './reducers/coinReducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import SingleCoin from './pages/SingleCoin';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NoMatch from './pages/NoMatch/NoMatch';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current user saved mention data / profile data

    // Redirect to login
    window.location.href = '/login';
  }
}

generatePath('/coin/:id/', { id: 1 });
// Will return /coin/1/
//

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/coin" component={SingleCoin} />
          <Route path="/404" component={NoMatch} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  getCoinData: propTypes.func.isRequired,
  coin: propTypes.arrayOf(propTypes.object) //.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getCoinData: () => {
      dispatch(actionCreators.getCoinData());
    }
  };
};

const mapStateToProps = state => ({
  coins: fetchCoinData(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

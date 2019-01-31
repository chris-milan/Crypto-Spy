import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/homeActions';
import { fetchCoinData } from '../../reducers/coinReducer';

import BodyHeader from './bodyHeader';
import CryptoName from './cryptoName';
import Pagination from './pagination';
import Fade from '@material-ui/core/Fade';
import './homebody.css';

class HomeBody extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.props.getCoinData();
  }

  componentWillReceiveProps() {
    this.props.getCoinData();
  }

  CryptoClickedHandler = e => {
    const coinID = parseFloat(e.target.getAttribute('data-key'));
    this.props.setClickedCoin(coinID);
    window.location.href = '/coin';
  };

  render() {
    let coins = [];

    if (this.props.coins[0]) {
      coins = this.props.coins.map(coin => {
        return coin.rank ? <CryptoName key={coin.id} coin={coin} /> : null;
      });
    }

    const defaultView = (
      <Fade in timeout={1000} style={{ zIndex: 1501 }}>
        <div>
          <BodyHeader />
          <div onClick={this.CryptoClickedHandler} className="grid">
            {coins}
          </div>
        </div>
      </Fade>
    );
    return <div>{defaultView}</div>;
  }
}

HomeBody.propTypes = {
  getCoinData: propTypes.func.isRequired,
  setClickedCoin: propTypes.func.isRequired,
  clicked: propTypes.object.isRequired,
  coin: propTypes.arrayOf(propTypes.object) //.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getCoinData: () => {
      dispatch(actionCreators.getCoinData());
    },
    setClickedCoin: coin => {
      dispatch(actionCreators.setClickedCoin(coin));
    }
  };
};

const mapStateToProps = state => ({
  coins: fetchCoinData(state),
  clicked: state.clicked
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBody);

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/homeActions';
import { fetchCoinData } from '../../reducers/coinReducer';

import Aside from './aside';
import VisualFeedBox from './visualFeedBox';
import Fade from '@material-ui/core/Fade';
import './overviewbody.css';

class OverviewBody extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.props.getCoinData();
    const idClicked = parseFloat(localStorage.getItem('cbuzz_ID_clicked'));

    this.props.setClickedCoin(idClicked);
  }

  render() {
    let coinSelected = parseFloat(this.props.clicked.isClicked);
    let theData = {};

    if (this.props.coins[0]) {
      if (coinSelected > 0) {
        this.props.coins.forEach(coin => {
          if (coin.id === coinSelected) {
            theData = {
              rank: coin.rank,
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              totalMentions: coin.totalMentions,
              mentionsYear: coin.mentionsYear,
              Month: coin.Month,
              Week: coin.Week,
              TwentyFourHr: coin.TwentyFourHr,
              TwelveHr: coin.TwelveHr,
              SixHr: coin.SixHr,
              FourHr: coin.FourHr,
              TwoHr: coin.TwoHr,
              OneHr: coin.OneHr,
              ThirtyMin: coin.ThirtyMin,
              FifteenMin: coin.FifteenMin,
              TenMin: coin.TenMin,
              FiveMin: coin.FiveMin,
              ThreeMin: coin.ThreeMin,
              OneMin: coin.OneMin,
              allCoinsMentionsPercent: coin.allCoinsMentionsPercent,
              whispers: coin.whispers
            };
          }
        });
      }
    }

    return (
      <Fade in timeout={1000} style={{ zIndex: 1501 }}>
        <div>
          <div className="row overviewBody">
            <div className="col">
              <Aside key={1} data={theData} />
            </div>
            <div className="col-8">
              <VisualFeedBox key={2} data={theData} />
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

OverviewBody.propTypes = {
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
)(OverviewBody);

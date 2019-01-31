import React, { Component } from 'react';
import axios from 'axios';
import './aside.css';

let justOnce = 0;
let marketCap = 'Loading...';
let percent_change_24h = 'Loading...';
let percent_change_1h = 'Loading...';
let percent_change_7d = 'Loading...';
let price = 'Loading...';
let volume_24h = 'Loading...';
let Circulating_Supply = 'Loading...';
let Total_Supply = 'Loading...';
let Max_Supply = 'Loading...';

class CoinMarketCapStats extends Component {
  state = {
    data: {}
  };

  render() {
    if (typeof this.props.data !== 'undefined' && justOnce < 1) {
      justOnce++;

      axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${this.props.data}/`)
        .then(res => {
          this.setState({ data: res.data }, () => {
            marketCap = this.state.data.data.quotes.USD.market_cap;
            percent_change_24h = this.state.data.data.quotes.USD
              .percent_change_24h;
            percent_change_1h = this.state.data.data.quotes.USD
              .percent_change_1h;
            percent_change_7d = this.state.data.data.quotes.USD
              .percent_change_7d;
            price = this.state.data.data.quotes.USD.price;
            volume_24h = this.state.data.data.quotes.USD.volume_24h;

            Circulating_Supply = this.state.data.data.circulating_supply;
            Total_Supply = this.state.data.data.total_supply;
            Max_Supply = this.state.data.data.max_supply;
          });
        })
        .catch(err => console.log(err.response.data));
    }

    // setup conditional rendering if stats dont exist
    const defaultView = (
      <div className="coinMarketCapStats">
        <div>
          <h4>CoinMarketCap.com Stats:</h4>
          <ul>
            <li>Circulating Supply: {Circulating_Supply}</li>
            <li>Total Supply: {Total_Supply}</li>
            <li>Max Supply: {Max_Supply}</li>
            <li>Market Cap: {marketCap}</li>
            <li>Current Price: {price}</li>
            <li>Change (7 Days): {percent_change_7d}%</li>
            <li>Change (1 Day): {percent_change_24h}%</li>
            <li>Change (24 Hour): {percent_change_24h}%</li>
            <li>Change (1 Hour): {percent_change_1h}%</li>
            <li>Volume (24 Hour): {volume_24h}</li>
          </ul>
        </div>
      </div>
    );
    return <div>{defaultView}</div>;
  }
}

export default CoinMarketCapStats;

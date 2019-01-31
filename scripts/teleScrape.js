const moment = require('moment');
moment().format();
const now = moment(Date.now()).unix();

const mongoKeys = require('../config/keys').mongoURI;

const botKey = require('../config/keys').TELEGRAM_API;

const binance_API = require('../config/keys').BINANCE_API;
const binance_KEY = require('../config/keys').BINANCE_KEY;

const mongoose = require('mongoose');
const ranked = require('ranked');

mongoose.Promise = global.Promise;
mongoose.connect(
  mongoKeys,
  { useNewUrlParser: true, useCreateIndex: true }
);

const Coin = require('../models/Coin');

const TeleBot = require('telebot');
const bot = new TeleBot(botKey);
const axios = require('axios');

const util = require('util');

function ObjLog(x) {
  console.log(util.inspect(x, { showHidden: false, depth: null }));
}

const binance = require('node-binance-api')().options({
  APIKEY: binance_API,
  APISECRET: binance_KEY,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});

let myCandles = {
  m1: [],
  m3: [],
  m5: [],
  m10: [],
  m15: [],
  m30: [],
  h1: [],
  h2: [],
  h4: [],
  h6: [],
  h12: [],
  d1: [],
  w1: []
};
let start_arr_numd = 0;
let until_arr_numd = 500;
let numd_arr = Array(until_arr_numd - start_arr_numd)
  .fill()
  .map(() => start_arr_numd++);

const agoArray = (interval, type, timesNeeded) => {
  let start_arr_numd = 0;
  const numd_arr = Array(timesNeeded - start_arr_numd)
    .fill()
    .map(() => start_arr_numd++);

  let result = [];
  result.push(moment(Date.now()).unix());

  let temp = interval;
  numd_arr.forEach(index => {
    result[index + 1] = moment()
      .subtract(temp, type)
      .unix();
    temp = temp + interval;
  });
  return result;
};

const updater = 'development';

const coinMarketCapAPI_Downloaded = require('./download.json');
const coinMarketCapAPI = 'https://api.coinmarketcap.com/v2/listings/';
const indiviualCoinMarketCap = 'https://api.coinmarketcap.com/v2/ticker/';

let coinData = {
  data: []
};

let coinDataRevised = {
  data: []
};

let theDataJSON = coinMarketCapAPI_Downloaded.data;

pullFrom_Coin_Market_Cap = () => {
  axios
    .get(coinMarketCapAPI)
    .then(response => {
      theDataJSON = response;
    })
    .catch(error => {
      console.log(error);
    });
};

let rankedItems = [];

let start_arr = 0;
let end_arr = 500;
let dummy_arr = Array(end_arr - start_arr)
  .fill()
  .map(() => 0);

let x = 0;
theDataJSON.forEach(function(item) {
  x++;

  let initialize_blank_Data = {
    id: item.id,
    name: '',
    symbol: '',
    totalMentions: 0,
    mentionsYear: 0,
    Month: 0,
    Week: 0,
    TwentyFourHr: 0,
    TwelveHr: 0,
    SixHr: 0,
    FourHr: 0,
    TwoHr: 0,
    OneHr: 0,
    ThirtyMin: 0,
    FifteenMin: 0,
    TenMin: 0,
    FiveMin: 0,
    ThreeMin: 0,
    OneMin: 0,
    mentionHistory: {
      Week: dummy_arr,
      TwentyFourHr: dummy_arr,
      TwelveHr: dummy_arr,
      SixHr: dummy_arr,
      FourHr: dummy_arr,
      TwoHr: dummy_arr,
      OneHr: dummy_arr,
      ThirtyMin: dummy_arr,
      FifteenMin: dummy_arr,
      TenMin: dummy_arr,
      FiveMin: dummy_arr,
      ThreeMin: dummy_arr,
      OneMin: dummy_arr
    },
    allCoinsMentionsPercent: 0,
    possible_symbol_phrases: [],
    possible_name_phrases: [],
    coinMarketCap: {
      marketCap: 0,
      price: 0,
      vol24Hr: 0,
      circulatingSupply: 0,
      change: ''
    },
    whispers: []
  };

  coinData.data.push(initialize_blank_Data);

  let coinName = [item.name];
  let coinSymbol = [item.symbol];

  coinName.push(item.name.toLowerCase());
  coinName.push(coinName[1].charAt(0).toUpperCase() + coinName[1].substr(1));
  coinSymbol.push(item.symbol.toLowerCase());
  coinSymbol.push(
    coinSymbol[1].charAt(0).toUpperCase() + coinSymbol[1].substr(1)
  );

  coinData.data[x - 1].name = coinName[0];
  coinData.data[x - 1].symbol = coinSymbol[0];

  if (
    coinSymbol[0] !== 'OK' ||
    coinSymbol[0] !== 'FOR' ||
    coinSymbol[0] !== 'SEND' ||
    coinSymbol[0] !== 'GET' ||
    coinSymbol[0] !== 'YOU' ||
    coinSymbol[0] !== 'CAN' ||
    coinSymbol[0] !== 'TELL' ||
    coinSymbol[0] !== 'SURE'
  ) {
    coinData.data[x - 1].possible_symbol_phrases = coinSymbol;
  }
  coinData.data[x - 1].possible_name_phrases = coinName;
});

let initialString = '';

lookForMentions();
function lookForMentions() {
  bot.on('text', msg => {
    initialString = msg.text;
    if (typeof initialString == 'string') {
      insertMatch();
    }
  });

  bot.on('forward', msg => {
    initialString = msg.text;
    if (typeof initialString == 'string') {
      insertMatch();
    }
  });

  bot.start();
}

function insertMatch() {
  const specialCharsAll = '!`~@#$%^&*()-_+=./<>{}[]|:;1234567890"' + "'";
  const specialChars = specialCharsAll.split('');

  let splitItUp;

  splitItUp = initialString
    .replace('?', ' ')
    .replace('!', ' ')
    .replace('`', ' ')
    .replace('~', ' ')
    .replace('@', ' ')
    .replace('#', ' ')
    .replace('$', ' ')
    .replace('%', ' ')
    .replace('&', ' ')
    .replace('*', ' ')
    .replace('(', ' ')
    .replace(')', ' ')
    .replace('-', ' ')
    .replace('_', ' ')
    .replace('=', ' ')
    .replace('.', ' ')
    .replace('/', ' ')
    .replace('<', ' ')
    .replace('>', ' ')
    .replace('>', ' ')
    .replace('{', ' ')
    .replace('}', ' ')
    .replace('[', ' ')
    .replace(']', ' ')
    .replace(':', ' ')
    .replace(';', ' ')
    .replace('1', ' ')
    .replace('2', ' ')
    .replace('3', ' ')
    .replace('4', ' ')
    .replace('5', ' ')
    .replace('6', ' ')
    .replace('7', ' ')
    .replace('8', ' ')
    .replace('9', ' ')
    .replace('0', ' ')
    .replace('"', ' ')
    .replace("'", ' ')
    .split(' ');

  let checkwords = splitItUp.filter(Boolean); // Takes out empty strings from splitItUp array

  let x = 0;
  coinData.data.forEach(function(item) {
    x++;

    let whisperArray = coinData.data[x - 1].whispers;

    let coinID = coinData.data[x - 1].id;

    let possible_names = item.possible_name_phrases;
    let possible_symbols = item.possible_symbol_phrases;
    let totalMentions = coinData.data[x - 1].totalMentions + 1;

    let now = Date.now();
    checkwords.forEach(item => {
      function APIupdateMention() {
        coinData.data[x - 1].totalMentions = totalMentions;
        coinData.data[x - 1].whispers.push({
          whisper: initialString,
          date: now
        });

        let initialWhisper = coinData.data[x - 1].whispers[0].date;

        function minAgo(min) {
          return moment().subtract(min, 'm');
        }

        let back1Min = minAgo(1);
        let back3Min = minAgo(3);
        let back5Min = minAgo(5);
        let back10Min = minAgo(10);
        let back15Min = minAgo(15);
        let back30Min = minAgo(30);

        function hrAgo(hr) {
          return moment().subtract(hr, 'h');
        }

        let back1Hr = hrAgo(1);
        let back2Hr = hrAgo(2);
        let back4Hr = hrAgo(4);
        let back6Hr = hrAgo(6);
        let back12Hr = hrAgo(12);
        let back24Hr = hrAgo(24);

        let back1Week = moment().subtract(1, 'w');
        let back1Month = moment().subtract(1, 'M');
        let back1Year = moment().subtract(1, 'y');

        resetWhisperCount();
        function resetWhisperCount() {
          coinData.data[x - 1].mentionsYear = 0;
          coinData.data[x - 1].Month = 0;
          coinData.data[x - 1].Week = 0;
          coinData.data[x - 1].TwentyFourHr = 0;
          coinData.data[x - 1].TwelveHr = 0;
          coinData.data[x - 1].SixHr = 0;
          coinData.data[x - 1].FourHr = 0;
          coinData.data[x - 1].TwoHr = 0;
          coinData.data[x - 1].OneHr = 0;
          coinData.data[x - 1].ThirtyMin = 0;
          coinData.data[x - 1].FifteenMin = 0;
          coinData.data[x - 1].TenMin = 0;
          coinData.data[x - 1].FiveMin = 0;
          coinData.data[x - 1].ThreeMin = 0;
          coinData.data[x - 1].OneMin = 0;
        }

        whisperArray.forEach(item => {
          let whisperTime = moment(item.date);

          if (whisperTime > back1Min) {
            coinData.data[x - 1].OneMin = coinData.data[x - 1].OneMin + 1;
          }

          if (whisperTime > back3Min) {
            coinData.data[x - 1].ThreeMin = coinData.data[x - 1].ThreeMin + 1;
          }

          if (whisperTime > back5Min) {
            coinData.data[x - 1].FiveMin = coinData.data[x - 1].FiveMin + 1;
          }

          if (whisperTime > back10Min) {
            coinData.data[x - 1].TenMin = coinData.data[x - 1].TenMin + 1;
          }

          if (whisperTime > back15Min) {
            coinData.data[x - 1].FifteenMin =
              coinData.data[x - 1].FifteenMin + 1;
          }

          if (whisperTime > back30Min) {
            coinData.data[x - 1].ThirtyMin = coinData.data[x - 1].ThirtyMin + 1;
          }

          if (whisperTime > back1Hr) {
            coinData.data[x - 1].OneHr = coinData.data[x - 1].OneHr + 1;
          }

          if (whisperTime > back2Hr) {
            coinData.data[x - 1].TwoHr = coinData.data[x - 1].TwoHr + 1;
          }

          if (whisperTime > back4Hr) {
            coinData.data[x - 1].FourHr = coinData.data[x - 1].FourHr + 1;
          }

          if (whisperTime > back6Hr) {
            coinData.data[x - 1].SixHr = coinData.data[x - 1].SixHr + 1;
          }

          if (whisperTime > back12Hr) {
            coinData.data[x - 1].TwelveHr = coinData.data[x - 1].TwelveHr + 1;
          }

          if (whisperTime > back24Hr) {
            coinData.data[x - 1].TwentyFourHr =
              coinData.data[x - 1].TwentyFourHr + 1;
          }

          if (whisperTime > back1Week) {
            coinData.data[x - 1].Week = coinData.data[x - 1].Week + 1;
          }

          if (whisperTime > back1Month) {
            coinData.data[x - 1].Month = coinData.data[x - 1].Month + 1;
          }

          if (whisperTime > back1Year) {
            coinData.data[x - 1].mentionsYear =
              coinData.data[x - 1].mentionsYear + 1;
          }
        });

        Coin.findOne({ id: coinID }, (err, doc) => {
          if (err) return console.log(err);

          function updateWhispers() {
            let coinWhispers = {
              id: doc.whispers.length + 1,
              whisper: initialString
            };

            Coin.update(
              { id: coinID },
              { $push: { whispers: coinWhispers } },
              (err, doc) => {
                if (err) return console.log(err);
                console.log(doc);
              }
            );
          }

          if (updater == 'development') {
            updateWhispers();
          } else {
            if (totalMentions > doc.totalMentions) {
              updateWhispers();
            }
          }
        });
      }

      if (
        item == possible_names[0] ||
        item == possible_names[1] ||
        item == possible_names[2]
      ) {
        //console.log('it works with names');
        APIupdateMention();
      } else if (
        item == possible_symbols[0] ||
        item == possible_symbols[1] ||
        item == possible_symbols[2]
      ) {
        //console.log('it works with symbols');
        APIupdateMention();
      }
    });
  });

  let tempArr = [];
  let zyx = 0;
  coinData.data.forEach(coin => {
    zyx++;
    let whisperArray = coin.whispers;
    if (whisperArray[0]) {
      myCandles.m1 = agoArray(1, 'm', 500);
      myCandles.m3 = agoArray(3, 'm', 500);
      myCandles.m5 = agoArray(5, 'm', 500);
      myCandles.m10 = agoArray(10, 'm', 500);
      myCandles.m15 = agoArray(15, 'm', 500);
      myCandles.m30 = agoArray(30, 'm', 500);
      myCandles.h1 = agoArray(1, 'h', 500);
      myCandles.h2 = agoArray(2, 'h', 500);
      myCandles.h4 = agoArray(4, 'h', 500);
      myCandles.h6 = agoArray(6, 'h', 500);
      myCandles.h12 = agoArray(12, 'h', 500);
      myCandles.d1 = agoArray(24, 'h', 500);
      myCandles.w1 = agoArray(1, 'w', 500);

      let whisperTimes = [];

      whisperArray.forEach(whisper => {
        whisperTimes.push(moment(whisper.date).unix());
      });

      let oneMinCandles = myCandles.m1.reverse();

      for (var i = 0; i <= whisperTimes.length; i++) {
        if (whisperTimes[i] > oneMinCandles[oneMinCandles - 0 - 1]) {
          coinData.data[zyx - 1].mentionHistory.OneMin[0] =
            coinData.data[zyx - 1].mentionHistory.OneMin[0] + 1;
        }
      }

      console.log(whisperTimes);
      let theDiff = null;


      console.log(whisperArray);

    }
  });

  numd_arr.forEach(index => {
    if (coinData.data[zyx - 1].mentionHistory.OneMin[index] !== 0) {
      let numOfWhispers = coinData.data[zyx - 1].mentionHistory.OneMin[index];
      console.log('index num:', index, '...', numOfWhispers);
    }
  });

  const notZeroMentions = coinData.data.filter(coin => {
    return coin.totalMentions > 0;
  });


  let alltheFrigginMentions = 0;
  notZeroMentions.forEach(coin => {
    alltheFrigginMentions = alltheFrigginMentions + coin.totalMentions;
  });

  let q = 0;
  coinData.data.forEach(item => {
    q++;
    coinData.data[q - 1].allCoinsMentionsPercent =
      (coinData.data[q - 1].totalMentions / alltheFrigginMentions) * 100;
  });

  const scoreFn = coinsToRank => coinsToRank.TwentyFourHr;

  rankedItems = ranked.ranking(notZeroMentions, scoreFn);
  rankedItems.forEach(coin => {
    coin.id = coin.item.id;
    coin.name = coin.item.name;
    coin.symbol = coin.item.symbol;
    coin.totalMentions = coin.item.totalMentions;
    coin.mentionsYear = coin.item.mentionsYear;
    coin.Month = coin.item.Month;
    coin.Week = coin.item.Week;
    coin.TwentyFourHr = coin.item.TwentyFourHr;
    coin.TwelveHr = coin.item.TwelveHr;
    coin.SixHr = coin.item.SixHr;
    coin.FourHr = coin.item.FourHr;
    coin.TwoHr = coin.item.TwoHr;
    coin.OneHr = coin.item.OneHr;
    coin.ThirtyMin = coin.item.ThirtyMin;
    coin.FifteenMin = coin.item.FifteenMin;
    coin.TenMin = coin.item.TenMin;
    coin.FiveMin = coin.item.FiveMin;
    coin.ThreeMin = coin.item.ThreeMin;
    coin.OneMin = coin.item.OneMin;
    coin.allCoinsMentionsPercent = coin.item.allCoinsMentionsPercent;
    coin.possible_symbol_phrases = coin.item.possible_symbol_phrases;
    coin.possible_name_phrases = coin.item.possible_name_phrases;
    coin.whispers = coin.item.whispers;
    coin.mentionHistory = coin.item.mentionHistory;
    coin.item = null;

    Coin.updateMany(
      { id: coin.id },
      {
        $set: {
          rank: coin.rank,
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
          allCoinsMentionsPercent: coin.allCoinsMentionsPercent
        }
      },
      (err, doc) => {
        if (err) return console.log(err);
      }
    );
  });

  coinDataRevised.data = rankedItems;
}
console.log('TELESCRAPE.JS LEFT OFF AT LINE 512');

module.exports.getJSON_File = () => coinDataRevised;


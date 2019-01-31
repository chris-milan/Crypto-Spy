const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
  rank: Number,
  item: String,
  id: Number,
  name: String,
  symbol: String,
  totalMentions: Number,
  mentionsYear: Number,
  Month: Number,
  Week: Number,
  TwentyFourHr: Number,
  TwelveHr: Number,
  SixHr: Number,
  FourHr: Number,
  TwoHr: Number,
  OneHr: Number,
  ThirtyMin: Number,
  FifteenMin: Number,
  TenMin: Number,
  FiveMin: Number,
  ThreeMin: Number,
  OneMin: Number,
  allCoinsMentionsPercent: Number,
  possible_symbol_phrases: [{ type: String }],
  possible_name_phrases: [{ type: String }],
  whispers: [
    {
      id: Number,
      whisper: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Coin = mongoose.model('Coin', cryptoSchema);

module.exports = Coin;

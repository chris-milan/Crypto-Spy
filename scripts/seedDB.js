const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = require('../models/Coin');
const mongoKeys = require('../config/keys').mongoURI;

const theJSON = require('./seedfile.json').data;

// This file empties the Coins collection and inserts the coins below

mongoose.connect(
  mongoKeys,
  { useNewUrlParser: true, useCreateIndex: true }
);


db.remove({})
  .then(() => db.collection.insertMany(theJSON))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

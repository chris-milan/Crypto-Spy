const router = require('express').Router();
const coinsController = require('../../controllers/coinsController');

const teleScrapeFile = require('../../scripts/teleScrape.js');
const theJSON = teleScrapeFile.getJSON_File();

router.get('/', function(req, res) {
  res.send(theJSON);
});

module.exports = router;

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSaveInput(data) {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

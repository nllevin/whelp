const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (!Validator.isLength(data.body, { min: 1, max: 5000 })) {
    errors.body = 'Body must be between 1 and 5000 characters';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body field is required';
  }

  if (typeof data.rating !== "number" || !data.rating) {
    errors.rating = 'Rating is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
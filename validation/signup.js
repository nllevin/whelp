const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateSignupInput(data) {
  let errors = {};
  
  data.firstName = validText(data.firstName) ? data.firstName : '';
  data.lastName = validText(data.lastName) ? data.lastName : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.zipCode = validText(data.zipCode) ? data.zipCode : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = 'ZIP Code field is required';
  }

  if (!Validator.matches(data.zipCode, /^\d{5}(-\d{4})?$/)) {
    errors.zipCode = 'ZIP Code is invalid';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
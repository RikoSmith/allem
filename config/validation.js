const validator = require('validator');

//Custom isEmpty function-------------------------------------------------------
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

//Validate register inputs------------------------------------------------------
exports.validateRegister = function(data) {};

//Validate login inputs---------------------------------------------------------
exports.validateLogin = function(data) {
  let errors = {};

  if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = 'Длина имени должна быть между 3 и 30 символами';
  }

  if (validator.isEmpty(data.username)) {
    errors.username = 'Вы забыли ввести имя';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Вы забыли ввести пароль';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

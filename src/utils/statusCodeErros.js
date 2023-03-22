const errorsObj = {
  DATABASE_ERROR: 500,
  PRODUCT_NOT_FOUND: 404,
  INVALID_INPUT: 422,
};

const setError = (errorMessage) => errorsObj[errorMessage] || 500;

module.exports = {
  setError,
};
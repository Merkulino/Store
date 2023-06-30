const errorsObj = {
  DATABASE_ERROR: 500,
  NOT_FOUND: 404,
  INVALID_INPUT: 422,
  CONFLICT: 409,
};

const setError = (errorMessage) => errorsObj[errorMessage] || 500;

module.exports = {
  setError,
};
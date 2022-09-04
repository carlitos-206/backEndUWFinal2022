module.exports = function (api) {
  return {
    plugins: ['macros'],
  }
}

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['macros'],
  }
}
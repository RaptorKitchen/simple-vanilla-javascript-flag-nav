const path = require('path');

module.exports = {
  entry: {
    app: './js/flags.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/flags.js',
  },
};

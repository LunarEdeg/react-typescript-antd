const { merge } = require('webpack-merge');
// const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const glob = require('glob');
// const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const common = require('./webpack.common.js');
// const { PROJECT_PATH } = require('../constants');

// const { resolve } = path;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    // }),
  ],
});

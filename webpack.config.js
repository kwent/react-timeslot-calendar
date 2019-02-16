var webpack = require('webpack');
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const path = require('path');

module.exports = {
  entry: './src/js/react-timeslot-calendar.jsx',
  externals: ['react', 'react-dom'],
  target: 'node',
  output: {
    path: path.join(__dirname, './build'),
    filename: 'build.min.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new WebpackBundleSizeAnalyzerPlugin('./reports/plain-report.txt'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
    ],
  },
};

var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var minify = process.env.MINIFY || false;

var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: path.resolve('./source')
};

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
});


module.exports = {
  devtool: 'sourcemap',

  entry: './source/index.js',

  output: {
    filename: minify ? 'index.min.js' : 'index.js',
    path: path.resolve('./build'),
    libraryTarget: 'commonjs2',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
    preLoaders: env === 'development' ? [
      eslintLoader
    ] : [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-1'],
          plugins: ['transform-object-assign']
        },
        include: path.resolve('./source')
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: './.eslintrc'
  }
};

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

let config = {
  mode: process.env.NODE_ENV,
  entry: [
    './polyfill.js',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      'moment': path.resolve(__dirname, 'node_modules/moment/moment.js'),
      'images': path.resolve(__dirname, 'src/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 70000,
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.devServer = {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 9000
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

if (process.env.NODE_ENV === 'production') {
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin()
  )
}

module.exports = config

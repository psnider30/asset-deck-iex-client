import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { removeEmpty } from 'webpack-config-utils';
const path = require('path')


export default {
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: removeEmpty([

    /**
     * Takes care of inserting all the necessary <scripts> and <styles> into the app'sass
     * index.html entry point.
     *
     * See https://github.com/jantimon/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html')
    }),

    /**
     * Moves our CSS into external files instead of jamming everything into <style> tag
     *
     * See https://github.com/webpack-contrib/extract-text-webpack-plugin
     */
    new ExtractTextPlugin({
      filename: './css/[name]-[hash].css',
      allChunks: true
    }),

    // This informs certain dependencies e.g. React that they should be compiled for prod
    // see https://github.com/facebook/react/issues/6479#issuecomment-211784918
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        'API_HOST': 'https://asset-deck-iex.herokuapp.com/api',
        'IEX_API': `https://api.iextrading.com/1.0/stock`
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),


    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),
  ])
}

import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const path = require('path')


export default {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(__dirname, "src"),

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

    // This informs certain dependencies e.g. React that they should be compiled for prod
    // see https://github.com/facebook/react/issues/6479#issuecomment-211784918
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        'REACT_APP_API_HOST_HEROKU': 'https://asset-deck-iex.herokuapp.com/api',
        'REACT_APP_IEX_API': `https://api.iextrading.com/1.0/stock`
      }
    }),

  ])
}

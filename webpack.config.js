const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      //file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg|ico|)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      //file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/assets/media/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.EnvironmentPlugin( { ...process.env } ),
    new webpack.DefinePlugin({
      NODE_ENV: 'development',
      REACT_APP_API_HOST_LOCAL: JSON.stringify('http://localhost:3001'),
      REACT_APP_API_HOST_HEROKU: JSON.stringify('https://asset-deck-api.herokuapp.com'),
      REACT_APP_IEX_API: JSON.stringify('https://api.iextrading.com/1.0/stock'),
    }),
  ],
  devServer: {
    // static files served from here
    // contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    // open app in localhost:3000
    port: 3000,
    stats: 'errors-only',
    open: true
  },
};

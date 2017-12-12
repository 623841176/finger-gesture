var webpack = require('webpack');
var path = require('path');
import HtmlWebpackPlugin from 'html-webpack-plugin';
const htmlTplPlugin = new HtmlWebpackPlugin({
  template: './index.ejs',
  title: '手势放大缩小',
  description: '简单手势',
});

module.exports = {

  context: path.resolve(__dirname, "src"),
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    htmlTplPlugin,
  ],
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dev'),
    publicPath: "/",
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.less/, use: ['style', 'css', 'less'] },
      { test: /\.css$/, use: ['style', 'css'] },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: 'static/[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less', 'jsonp'],
  },
  devServer: {
    inline: true,
    port: 3002,
    host: '0.0.0.0',
    publicPath: '/',
    contentBase: './src',
  }
};
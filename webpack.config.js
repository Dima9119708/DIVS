const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
  mode: 'development',
  entry: {
    index : './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template : './src/pug/index.pug'
    }),
    new CopyPlugin([
      {
        from: './src/images',
        to: 'images'
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 8080,
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/i,
        use: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: [
                    '> 1%',
                    'ie >= 8',
                    'edge >= 15',
                    'ie_mob >= 10',
                    'ff >= 45',
                    'chrome >= 45',
                    'safari >= 7',
                    'opera >= 23',
                    'ios >= 7',
                    'android >= 4',
                    'bb >= 10']
                })
              ],
              sourceMap: true
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: ['file-loader']
      },
    ],
  },
};
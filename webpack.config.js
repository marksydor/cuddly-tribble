const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const settings = {
  appName: "Aug15_3"
}

module.exports = (env, arg) => ({
  entry: ['./src/app.js'],
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: `/webapp/${settings.appName}`
  },
  devtool: arg.mode != 'production' ? 'eval-source-map' : 'nosources-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.(jpe|jpg|png)(\?.*$|$)/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      }
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff",
      options: {
        name: '[path][name].[ext]',
      }
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader",
      options: {
        name: '[path][name].[ext]',
      }
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
      favicon: "./assets/icons/rule.ico"
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // }),
  ]
});

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require( 'html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'build/static/js'),
    filename: `bundle.min.js`,
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, 'public/index.html'),
      filename: 'index.html'
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
};
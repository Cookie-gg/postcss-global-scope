/** @type {import('webpack').Configuration} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('../dist/index.js');

const plugins = [plugin({ classes: ['dark', 'light'] }), 'postcss-nested'];

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  entry: './src/index.ts',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },

  devtool: process.env.NODE_ENV === 'development' && 'inline-source-map',

  devServer: {
    hot: true,
    static: './dist',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins } },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
};

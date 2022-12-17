import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = _resolve(__dirname, '..', './src/index.tsx');
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
export const module = {
  rules: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      type: 'asset/inline',
    },
  ],
};

export const output = {
  path: _resolve(__dirname, '..', './build'),
  filename: 'bundle.js',
};

export const plugins = [
  new HtmlWebpackPlugin({
    template: _resolve(__dirname, '..', './src/index.html'),
  }),
];

export const mode = 'development';
export const stats = 'errors-only';

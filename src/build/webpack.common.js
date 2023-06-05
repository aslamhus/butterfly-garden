import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'scripts/[name].bundle.js',
    publicPath: '/',
  },
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      {
        test: /\.(scss|css)$/,
        use: [
          // we use single style tag in order to speed up innerHTML for PDF generation
          {
            loader: 'style-loader',
            options: {
              // attributes: { id: 'id' },
              // insert: function insertAtTop(element) {
              //   var parent = document.querySelector('head');
              //   element.id = 'my-test-id';
              //   parent.append(element);
              // },
            },
          },
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: () => [require('autoprefixer')],
          //     },
          //   },
          // },
          // {
          //   loader: 'sass-loader',
          // },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    // extensions: ['js', 'ts'],
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, '../App/utils'),
      '@images': path.resolve(__dirname, '../../images/'),
      '@api': path.resolve(__dirname, '../App/api'),
      '@components': path.resolve(__dirname, '../App/Components'),
    },
  },
};

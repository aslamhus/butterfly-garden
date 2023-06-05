import path from 'path';
import { merge } from 'webpack-merge';
import * as url from 'url';
import common from './webpack.common.js';
const __dirname = path.resolve();

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../../dist'),
    },
    open: true,
    hot: true,
  },
});

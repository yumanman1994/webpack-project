const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // // 默认fasle
  // watch: true,
  // // watch配置
  // watchOptions: {
  //   // 忽略文件
  //   ignored: /node_modules/,
  //   // 监听到变化后会等300ms后再去执行 默认300ms
  //   aggregateTimeout: 300,
  //   poll: 1000,
  //   //

  // },
  entry: {
    app: './src/index.js',
    search: './src/search.jsx',
  },
  output: {
    filename: '[name]_build.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: '/.(js|jsx)$/',
  //       use: 'babel-loader',
  //       exclude: '/node_modules/',
  //     },
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 这里加入jsx
        use: 'babel-loader',
        exclude: /node_module/, //优化项(2):排除某个文件
      },
      {
        test: /\.(css|less)$/,
        //  配置的loader 项执行 是从右到左，先用css-loader解析css 在传递给style-loader
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_module/,
      },
      // {
      //   test: /.(png|jpg|gif|jpeg)$/,
      //   use: 'file-loader',
      // },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
          },
        },
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
  devServer: {
    contentBase: './dist', // 服务目录
    hot: true, //开启热更新
  },
}

const path = require('path');
// const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { options } = require('less');
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
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'production',
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          {
            loader: 'postcss-loader',
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader',
        ],
        exclude: /node_module/,
      },

      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new HtmlWebpackPlugin({
      // 模版 指定的html 可以使用ejs的语法
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html', // 输出文件名称
      chunks: ['search'], // 使用哪些chunk
      inject: true, // 打包之后chunk 的css js 注入指定的模版
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      // 模版 指定的html 可以使用ejs的语法
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html', // 输出文件名称
      chunks: ['app'], // 使用哪些chunk
      inject: true, // 打包之后chunk 的css js 注入指定的模版
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new CleanWebpackPlugin(),
    // 压缩css
  ],
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  // devServer: {
  //   contentBase: './dist', // 服务目录
  //   hot: true, //开启热更新
  // },
};

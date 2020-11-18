const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
// const WebpackDeepScopePlugin = require('webpack-deep-scope-plugin').default
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    // console.log(pageName)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        // 模版 指定的html 可以使用ejs的语法
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`, // 输出文件名称
        chunks: [pageName], // 使用哪些chunk
        inject: true, // 打包之后chunk 的css js 注入指定的模版
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

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
  entry,
  output: {
    filename: 'js/[name]_[chunkhash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  // mode: 'production',
  mode: 'none',
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
            name: 'images/[name]_[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),

    new CleanWebpackPlugin(),
    // mode 设置为none 手动开启 scope hoisting
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new WebpackDeepScopePlugin(),

    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry:
    //         'https://cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.production.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry:
    //         'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
  ].concat(htmlWebpackPlugins),
  // devtool: 'eval',
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        reactBase: {
          test: /(react|react-dom)/,
          name: 'reactBase',
          chunks: 'all',
          priority: 10,
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          priority: 5,
          minChunks: 2, // 引入两次及以上被打包
        },
      },
    },
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  // devServer: {
  //   contentBase: './dist', // 服务目录
  //   hot: true, //开启热更新
  // },
}

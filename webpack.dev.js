const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const glob = require('glob')

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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
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
  devServer: {
    contentBase: './dist', // 服务目录
    hot: true, //开启热更新
  },
  devtool: 'cheap-source-map',
}

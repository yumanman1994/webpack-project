## weboack 学习笔记

**安装 webpack**

```shell
npm i webpack webpack-cli --save-dev
```

### 基础用法

#### entry

> entry:入口起点，指示 webpack 使用哪个模块来作为构建其内部依赖图的开始

**单个入口配置**
单入口配置 entry 是一个字符串

```javascript
module.exports = {
  entry: './src/index.js',
};
```

**多入口配置**
entry 是一个对象

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    index: './src/index.js',
  },
};
```

#### output

告诉 webpack 如何编译的文件输出到相应的磁盘文件夹

**单入口配置**

```javascript
module.export = {
  entry: './src/hello.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
};
```

**多入口配置**
通过占位符来确保文件名称的唯一

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    index: './src/index.js',
  },
  output:{
    filename:'[name].js', // name占位符号 打包之后文件的名称
    path: __dirname + '/dist',
  },
  }
}
```

#### loaders

webpack 开箱即用只支持 js 和 json 两种文件类型，通过 loaders 去支持其他文件类并转化成有效的模块，并且可以添加到依赖图中。
loader 本身是一个函数，接受源文件作为参数，返回转换的结果。

**常见的 loader**

- babel-loader： 转换 es6、7 等 js 新特性语法
- css-loader： 支持.css 文件的加载和解析
- less-loader： 将 less 转换成 css
- ts-loader： 将 ts 转换成 js
- file-loader： 进行图片，字体的打包
- row-loader： 将文件以字符串形式导入
- thread-loader 多进程打包 js 和 css

**使用**
在 webpack 配置的 module 属性中的 rules 数组配置多个 loeader
test: 指定匹配规则
use：指定使用的 loeadr 名称

```js
module.exports = {
  module:{
    rules:[
      {
        test:'/\.txt$/,
        use:'row.loader'
      }
    ]
  }
}
```

#### plugins

loader 用于转换 webpack 不能转换的类型，plugins 插件用于 bundle 文件的优化，资源管理和环境变量的注入，增强 webpack，可以理解为任何 loader 不能做的失去 plugins 都能完成。作用与整个构建的构成。
比如：构建之前 我们可以用 plugin 删除构建的目录

**常见的 plugin 插件**

- CommonsWebpckPlugin 将 chunks 相同的模块代码提取成公共的 js
- CleanWebpackPlugin 清理构建目录
- ExtractTextWebpackPlugin 将 css 从 bundle 文件提取成一个独立的 css 文件
- CopyWebpackPlugin 将文件夹或者文件拷贝到构建的输出目录
- HtmlWebpackPlugin 创建 html 文件 去承载 输出的 bundle
- UglifyWebpackPlugin 压缩 js
- ZipWebpackPlugin 将打包出的资源生成一个 zip 包

**plugins 用法**
将配置放入 webpack plugins 数组中

```javascript
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

#### mode 环境配置

`mode` 用来指定 当前构建的环境是：`production`、`development`、node 默认是 `production`
设置 `mode` 可以使用 `webpack` 内置的函数，插件功能，默认值 `production`

```js
module.exports = {
  mode: 'production',
};
```

或

```js
webpack --mode=production
```

**mode 内置函数功能**
选项| 描述
------------- | -------------
`development`| 设置 `process.env.NODE_ENV` 值为 `development`.开启 `NamedChunksPlugin` 和 `NameModulesPlugin`当开启 HMR 的时候使用该插件会显示模块的相对路径
`production` | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`.

### 解析 es6+和 jsx

下载依赖包 `@babel/core` 、`@babel/plugin-proposal-class-properties` 、`@babel/preset-env`、`@babel/preset-react` 注意版本要一致，、`babel-loader`

webpack.config.js 加入配置

```js
module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 这里加入jsx
        use: 'babel-loader',
        exclude: /node_module/, //优化项(2):排除某个文件

      },
    ],
  },
```

创建.babelrc 文件

```js
{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

#### 解析 less css 等

安装 `style-loader css-loader less less-loader`
添加配置

```json
{
    test: /\.(css|less)$/,
    //  配置的loader 项执行 是从右到左，先用css-loader解析css 在传递给style-loader
    use: ['style-loader', 'css-loader', 'less-loader'],
    exclude: /node_module/,
},
```

#### 解析图片 字体等资源

`file-loader` 用于处理图片 字体等
`url-loader `也可以处理图片 和字体 而且可以 设置较小资源自动 base64

```javascript
{
  test: /.(png|jpg|gif|jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 5120,
    },
  },
},
```

#### 文件监听

文件监听在发现源码发生变化的时候，自动构建出新的输出文件
webpack 开启监听模式的两种方式

- 启动 `webpack` 命令时候 带上`--watch` 参数
- 在配置 `webpack.config.js` 中设置 `watch:true`
  **实现原理**

#### `webpack-dev-server`

`WDS` 不刷新浏览器
`WDS` 不输出文件 而是放在内存中
通常是搭配 `HotModuleReplacementPlugin` 使用,开启热更新的功能

**原理**

#### 文件指纹

什么是文件指纹？
打包后输出的文件后缀，没有修改的文件 后缀不变，没有修改的文件能命中浏览器的缓存，加速我们页面的访问

- **hash**: 和整个项目构建相关，只要项目文件有修改，整个项目构建的 `hash` 值就会改变
- **Chunkhash**： 和 `webpack` 打包的 `chunk` 有关，不同的 `entry` 会生成不同的 `chunkhash` 值
  > chunkhash 没办法在热更新的时候使用,没办法和 HotmModuleReplacementPlugin 一起使用
- **Contenthash**：根据文件内容来定义 `hash`，文件内容不变，则 `contenthash` 不变
  > css 文件应该使用 contenthash，如果使用 chunkhash，修改同一个 entry 的 js ，该 entry 的 css 的后缀也会改变，不合理 ，所以应该使用 contenthash

**js 文件指纹设置**

```javascript
output: {
  filename: '[name][chunkhash:8].js';
}
```

**css 文件指纹设置**
`style-loader` 是将 `css` 放在内敛的 `style` 并放在文档头部，使用 `MiniCssExtractPlugin` 提取成 `css` 文件,他们两者不能同时使用，他们的作用功能是互斥的

```js
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name][contenthash:8].css',
  }),
];
```

**图片等资源指纹设置**
设置 file-loader 的 name，使用 hash

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name][hash:8].[ext]',
        },
      },
    },
  ];
}
```

#### 代码压缩

**js 压缩**
`webpack` `mode：production` 开启 内置了 `uglifyjs-webpack-plugin` 插件进行压缩，也可以手动安装 这个插件 设置该插件 比如开启并行压缩
**css 压缩**
使用 `optimize-css-assets-webpack-plugin`,同时使用 `cssnano`预处理器
**html 压缩**
`html-webpack-plugin`，设置压缩参数

```js
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
```

#### 自动清理构建目录

`clean-webpack-plugin`插件，每次构建前 默认删除 output 指定的输出目录

#### css 添加前缀

使用`postcss-loader`、`autoprefixer` ,注意是 样式文件的后置处理器，如果要是 less sass 要先解析成 css 在再使用

#### 移动端 css 转换成 rem

`px2rem-loaer`

#### 资源内联

js 内联 使用`row-loader`，css 使用`style.loader`或者`html-inline-css-webpack-plugin`

#### `scope hoisting`

`webpack` 构建后的代码存在大量的闭包代码
`mode` 设置为 `production` 自动开启 `scope hoisting`
没有开启 scope hoisting 引入的模块会被大量的闭包 包裹起来 导致 体积增大 （模块越多越明显），运行的代码时创建的函数作用域越多 内存开销越大
引入的模块 会被 \_\_weboack_require 包裹成一个匿名函数，按顺序放在一个数组里面，通过\_util_WEBPACK_IMPORTED_MODULE_1\_\_(moduleId)启动程序
scope hoisting 解决了上面的问题
原理：将所有的模块的代码 按顺序放在一个函数作用域里面，然后适当的重命名一些变量防止变量冲突
对比：通过 scope hoisting 可以减少函数声明代码 和内存开销

#### 代码分割和动态 import

对于大的 web 应用来说，将所有的代码都放在一个文件中加载很慢，某些特殊的代码是在某些特殊的时候才会被用到，webpack 有一个功能就是将你的代码库分割成 chunks，当代码运行到需要他们的时候再进行加载
适用的场景：

- 抽离相同的代码到一个共享块
- 脚本懒加载 似的初始下载的代码更小
  懒加载 js 脚本的方式
- commonJS:require.ensure
- es6:动态 import (目前还没有原生支持 需要 babel 转换 `babel/plugin-syntax-dynamic-import` 插件)

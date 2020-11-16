# tree shaking (摇树优化)

概念：一个模块可能有多个方法，只要其中某个方法使用到了，则整个文件都会被打到 `bundle` 里面去，`tree shaking` 就是只会把用到的方法打入 `bundle`，没用的方法会在 `uglify` 阶段被抹除掉
使用：`webpack` 默认支持，在`.babelrc` 里面设置` modules:false` `即可，mode` 为 `production` 的情况下默认开启

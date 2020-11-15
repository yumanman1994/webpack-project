# souce map

作用：通过`source map`定位源代码,发现 js 错误源码 行
**开发环境开启 线上环境关闭**
线上环境如果开启`source map`业务代码会暴露
线上排查问题的时候可以将 `souce map` 上传到 错误监控系统(sentry 等)
设置

```js
{
  devtool:'source-map',

}
```

`souce-map`:显示源码
`cheap-souce-map`:不显示源码
`eval`:最快编译

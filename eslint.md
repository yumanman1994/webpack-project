# webpack 与 eslint

优秀的规范
Airbnb： `eslint-config-airbnb` 、`eslint-config-airbnb-base`

##### 制定团队的 eslint 规范

不要重复造轮子 基于 eslint:recommend 配置并改进
能发现的代码错误的规则，全部开启
保住保持团队的代码风格统一，而不是限制开发体验

eslint 如何执行落地？

- 和 CI/CD （开发阶段引入自动化来频繁向客户交付应用的方法）系统集成
- 和 webpack 集成

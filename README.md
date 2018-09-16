# 比原浏览器

本项目是使用 https://blockmeta.com/api/v2 提供的api做的一个简单的比原浏览器。代码由ice的模板改造而来，详见参考。做这个的初衷是参加比原的一个开发比赛。另一个也是通过这个项目了解比原。本项目没有自己提供服务端，而是使用https://blockmeta.com/api/v2 提供的后端服务，因为提供一个全节点需要不少的空间及费用。

> 使用文档

使用:

- 启动调试服务: `npm start`
- 构建: `npm run build`

目录结构:

- react-router @4.x 默认采用 hashHistory 的单页应用
- 入口文件: `src/index.js`
- 导航配置: `src/menuConfig.js`
- 路由配置: `src/routerConfig.js`
- 路由入口: `src/router.jsx`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

> 联系方式 ： langren_qing@163.com

> 参考

- 比原api ：https://github.com/Bytom/bytom/wiki/Explorer-API
- ice 模板 ：https://alibaba.github.io/ice/scaffold-preview/ice-builder-platfrom/index.html#/

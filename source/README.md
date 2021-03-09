# ITV  VUE移动端组件库

 一个基于vue2.0的移动端多功能组件库

## 安装

```
npm install itv --save
```

### vue引入

```js
//全局安装
import itv form "itv";
vue.use(itv)

//按需加载 
import {scroller} from "itv"
vue.use(scroller);

```

按需加载需要引入 [ItvPlugin](https://www.npmjs.com/package/itv-loader)， 否则会按需加载将失效




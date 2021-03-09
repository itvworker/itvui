# itv-swiper

slideout 是一个可以左滑动的按组件

## 安装
----
$#div.class=doc-tab_doc-contet.id=page
    $#div.class=doc-tab-group
        $#div.class=tab-item-btn_active 全局注册 $#/div
        $#div.class=tab-item-btn 局部注册 $#/div
    $#/div
    $#div.class=doc-tab-content
$#div.class=doc-tab-item
```javascript
// 在入口处引入
import { swiper, swiperItem } from "itv"

Vue.use(swiper)
Vue.use(swiperItem)
```
$#/div
$#div.class=doc-tab-item
```javascript

import { swiper, swiperItem } from "itv"
export default {
  components: {
    swiper,
    swiperItem 
  }
}

```
$#/div
$#/div
$#/div
```html


```



### 属性

|名字|类型|默认值|说明|版本要求|
|-|-|-|-|-|
|value|Number|0|当前滑动的索引||
|loop|Boolean|false|是否索引||
|direction|String|row|row为横向滑动，column为纵向滑动||

### 方法
|名字|参数|说明|版本要求|
|-|-|-|-|
|scrollTo|(index, animate)|index参数类型Number,滚动到第几张;animate参数类型Boolean,是否要有过渡动画||
|init|无|初始化，当内容就变化，或者样式有变化时请使些方法，要初始化为那一屏，请先设置value值||
### 事件
|名字|参数|说明|版本要求|
|-|-|-|-|
|@touchstart|无|触屏开始||
|@touchend|无|触屏结束||
|@change|index|切换是反回切换的索引||

### 插槽
|名字|说明|版本要求|
|-|-|-|
|defalut|切换内容，主要放swpier-item组件和内容||
|dot|切换内容外的位置||




# calender

slideout 是一个可以左滑动的按组件

## 安装

---

$#div.class=doc-tab_doc-contet.id=page
    $#div.class=doc-tab-group
$#div.class=tab-item-btn_active 全局注册 $#/div
$#div.class=tab-item-btn 局部注册 $#/div
$#/div
    $#div.class=doc-tab-content
\$#div.class=doc-tab-item

```javascript
// 在入口处引入
import { slideout, slideitem, slidebutton } from 'itv'

Vue.use(slideout)
Vue.use(slideitem)
Vue.use(slidebutton)
```

$#/div
$#div.class=doc-tab-item

```javascript
import { slideout, slideitem, slidebutton } from 'itv'
export default {
    components: {
        slideout,
        slideitem,
        slidebutton,
    },
}
```

$#/div
$#/div
\$#/div

```html

```

### 属性

| 名字         | 类型   | 默认值   | 说明                                                                            | 版本要求 |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------- | -------- |
| width        | number | 200      | 裁剪的宽度                                                                      |          |
| height       | number | 200      | 裁剪的高度                                                                      |          |
| clipType     | string | orthogon | 可选值 orthogon(矩形裁前), circle(圆形裁剪) width 与 height 必须设置为同一数值; |          |
| outputFormat | string | png      | 输出图片类型                                                                    |          |

### 方法

| 名字        | 参数           | 说明             | 版本要求 |
| ----------- | -------------- | ---------------- | -------- |
| insertImage | value 图片路径 | 参数是图片 url   |
| reset       | --             | 重置操作的图片   |          |
| done        | --             | 返回 base64 图片 |          |

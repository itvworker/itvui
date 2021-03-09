# Toast


## 安装
----
$#div.class=doc-tab_doc-contet.id=page
    $#div.class=doc-tab-group
        $#div.class=tab-item-btn_active 全局注册 $#/div
    $#/div
    $#div.class=doc-tab-content
$#div.class=doc-tab-item
```
import Vue from 'vue';
import toast from 'itv/packages/toast/index'
Vue.use(toast)

```
```
//显示
this.$itv.toast.show({
    text: '加载中…'
    })

//显示文本
this.$itv.toast.text('小姐姐你好', 'middle')

//关闭
this.$itv.toast.hide()

// 状态
this.$itv.toast.state()
```
$#/div
$#/div
$#/div


>该组件仅支持全局注册，以插件的方式进行调用




### 属性

|名字|类型|默认值|说明|版本要求|
|-|-|-|-|-|
|text|string||暂时只支持String||
|position|string|middle|显示位置，可选值 default, top, middle, bottom||
|time|number|2000|显示时间|	--|
|type|string|text|类型，可选值 success, warn, cancel, text||

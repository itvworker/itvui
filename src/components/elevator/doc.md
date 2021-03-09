# Elevator 电梯楼层组件

## 安装

----
$#div.class=doc-tab_doc-contet.id=page
    $#div.class=doc-tab-group
        $#div.class=tab-item-btn_active 全局注册 $#/div
        $#div.class=tab-item-btn 局部注册 $#/div
    $#/div
    $#div.class=doc-tab-content
$#div.class=doc-tab-item
```
// 在入口处引入
import Vue from 'vue';
import ItvElevator from 'itv/packages/elevator'
Vue.use(tItvElevator)

```
$#/div
$#div.class=doc-tab-item
```
import ItvElevator from 'itv/packages/elevator'
export default {
  components: {
    ItvElevator
  }
}

```
$#/div
$#/div
$#/div

```html
<itv-elevator
        :dataArray="dataList"  
        :showIndicator="true"
        :navHeight="40"
        :initIndex="0"
        :hiddenTime='500'
        @clickNav="clickNav"
        @clickList="clickList"
        >    
</itv-elevator>
```
数据类型
```js
dataList:[
    {
      title:"A",
      list:[//可以为空数组
        {
          name:'安其拉',
          id:'a1'//id字段可以没有
        },
        {
          name:'安琪',
          id:'a2'
        }
      ]
    }    
]
```

## 属性

|名字|类型|默认值|说明|版本要求|
|----- | ----- | ----- | ----- |---|
| dataArray | Array  | [] |渲染楼层数据，为必填项 | --|
| showIndicator | Boolean | -- | 是否显示索引值提示符	| --|
| hiddenTime | Number| 500 | 索引值提示符显示的时间，单位ms   | --|
| navHeight  | Number| 500| 索引栏每个索引区域的高度，单位px ≈ | --|
| initIndex | Number | 0 | 进入页面后，当前定位到的索引值  | --|

## 事件
|事件名|说明|回调参数|
|--|--|--|
|clickNav|点击/离开索引栏时的回调函数|返回点击的索引值和title|
|clickList|点击左侧列表时的回调函数|返回点击的对象数据和所在区域的对象数据|

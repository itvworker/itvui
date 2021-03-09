# schedule

 schedule 是一个日程组件，目前支下拉刷新，上拉加载更改，要实现加载更多可以自己行实现  组件样式单位是使用ipx, 最后好配合[postcss-u2u](https://www.npmjs.com/package/postcss-u2u),要不然只能自己去更改ipx单位，改成你想要的单位

## 安装


```vue
<template>
    <schedule
        v-model="currentDate" 
        :min="minMonth"   
        :max="maxMonth"
        @bounce="slideBounce"
        @refresh="refresh"   
    >
    </schedule>
</template>
<script>
import schedule from './schedule'
export default {
    components: {
        schedule,
    },
    data() {
        return {
            currentDate: new Date().getTime(),
            minMonth:'2019/10',
            maxMonth: '2020/12'
        }
    },
    methods: {
        slideBounce(obj) {
            let size = obj.width - Math.abs(obj.x);
            if(Math.abs(size)>40){
                alert('已经滑动滑尽头')
            }
        },
        refresh() {
            
        }   
    }
}
<script>
```






### 属性

| 名字         | 类型   | 是否必传 |默认值   | 说明  | 版本要求 |
| ------------ | ------ | -------- | ---| -------- ||
| value    | String | 无 |Y| 必传，必须传2020/10/10这样的格式  |          |
| min       | String | 无 |N | 格式2020/10 |        |
| max     | String | 无 | N | 格式2020/12 |        |
|weekText|Array|N|["日", ....]| 周日至周六文字 ||
|monthText|Array|N|["1月", ....]| 1月至12月文字 ||
|toggleStatus|Number|N|1|只有初始化时才起用作，初始化结束后不起作用，0为日历收起,1为日历展开|
|iconBgColor| Stirng|N|"rgba(200,200,200,1)"|下拉刷新图标底色,必须为rgba格式||
|iconColor| Stirng|N|"rgba(200,200,200,1)"|下拉刷新图标主色,必须为rgba格式||
|bounceTop| Boolean|N|true|是否启用下拉刷新||
|speed| Number|N|30|数据滚动速度，0-100，数字越大滚动越快，并且滚动越久||
|pullDis|Number|N|60|触发下拉刷新的高度,当bounceTop为true才起作用，如果传0将自动获取下拉刷新图标内容的高度||


### 方法

| 名字        | 参数           | 说明             | 版本要求 |
| ----------- | -------------- | ---------------- | -------- |
| init | (value) | value为字日期字符串，如2010/10/10  |
| refresh|  无 | 数据有更新时调用，下刷新结束时也必须调用 |         |


### 事件
| 名字        | 参数           | 说明             | 版本要求 |
| ----------- | -------------- | ---------------- | -------- |
| @scroll | obj | 滚动的最大值，和当月的最大滚动值 ||
| @refresh|  无 | 下拉到触发下拉刷新时触发 ||
|@pull|postionY|下拉的距离, 下拉的时候触发||
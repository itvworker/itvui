
#uploadImage
imagePreview插件，主要用图片浏览，插件式调用

<h3 style="padding:0px 0px 10px 0px; margin:0px;border-bottom: #ddd solid 1px;">安装</h3>

<h4 style="padding:20px 0px 10px 0px; margin:0px;">1、全局安装</h4>

```javascript
import vue from 'vue';
import { imagePreview } from '@midea/pix-h5-components';
import '@midea/pix-h5-components/dist/components/imagePreview/styles/imagePreview.css';

vue.use(imagePreview);
```
#### 调用实例
```javascript
this.$pixImagePreview.open({
    index: 0,
    images:[{
        url: 'http://',
        w:1600,
        h:1700,
        loaded: true
    }],
    download(url) {
        //点击加载按钮反返图片的url
    },
    reload() {

    }
})
```
<div class="markdown-page-components">

<h3 style="padding:0px 0px 10px 0px; margin:0px;border-bottom: #ddd solid 1px;">方法</h3>

|方法名|参数|返回值|说明|
|--|---|---|---|
|open|Object||打开相册,相关参数请往下看|
|close|||关闭相册|
|isOpen||false/true|相册是否处于打开状态|

<h4 style="padding:0px 0px 10px 0px; margin:0px;border-bottom: #ddd solid 1px;">isOpen方法参数</h4>


|名字|类型|默认值|是否必须|说明|
|--|---|:---:|:---:|---|--|
|index|Number|0|Y|打开时显示第几张图片|
|images|[Object,...]||Y|预览图片数组|
|&emsp;src| String||Y|图片url,最好是已经加载完成的图片|
|&emsp;w|String||N|图片宽度,已经在页面加载过的图片不用传也可以;没有加载过的图片，将影响相册打开速度||
|&emsp;h|String||N|图片高度,已经在页面加载过的图片不用传也可以;没有加载过的图片，将影响相册打开速度||
|&emsp;loaded|Boolean|false|N|图片是否已经加载完成了，如果图片知道高宽，但没有加载过的，可以不传。如果图片加载完成的直接设为true,设为false影响相册开打开速度|
|download|Function||N|会返回一个url的参数到该方法上|
|reload|Function||N|点击右上角图标时执行|


</div>
<style>
.markdown-page-components{
    padding:0px;
    margin:0px;
}
.markdown-page-components table th:first-of-type { min-width: 90px; }
.markdown-page-components table th{
    min-width:60px;
    white-space:nowrap;
}

 </style>

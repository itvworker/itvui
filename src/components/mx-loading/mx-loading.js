import Vue from 'vue'
import './mx-loading.less'

var svg = `<div class="dagger-loading-content">
    <svg id="dagger-loading" viewBox="0 0 44 44" version="1.1">
    <g id="dagger-loading-pane" class="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="loading-circle" stroke-width="3">
    <circle id="circle-back-face" stroke="#5B5B5C" cx="22" cy="22" r="20" stroke-linecap="round"></circle>
    <circle id="circle-front-face" stroke="#188BF9" cx="22" cy="22" r="20" stroke-linecap="round"></circle>
    </g>
    <g id="result-success" transform="translate(2, 3)" stroke="#188BF9" stroke-width="3">
    <path d="M7.43725586,19.375 L15.6247559,27.625 L31.9372559,11.4375" stroke-linecap="round"></path>
    </g>
    <g id="result-failure" transform="translate(2, 3)" stroke="#FC4B4C" stroke-width="3">
    <path stroke-linecap="round" d="M10.125,10.09375 L29.9375,29.78125"></path>
    <path stroke-linecap="round" d="M10.125,10.09375 L29.9375,29.78125" transform="translate(20.031250, 19.937500) scale(-1, 1) translate(-20.031250, -19.937500) "></path>
    </g>
    </g>
    </svg>
    <div class="status-group"><p class="status-1"></p><p class="status-2"></p></div>
    </div>
    <div class="mx-loading-disable"></div>
    `

var body = document.getElementsByTagName('body')[0]
var div = document.createElement('div')
div.innerHTML = svg
body.appendChild(div)
var daggerLoadingContent = document.getElementsByClassName('dagger-loading-content')[0]
var bg = document.getElementsByClassName('mx-loading-disable')[0]
var daggerLoadingPane = document.getElementById('dagger-loading-pane')
var status1 = document.getElementsByClassName('status-1')[0]

Vue.prototype.mxLoading = {
    loading: function(text = '加载中', disable = true) {
        this.show(disable)
        daggerLoadingPane.setAttribute('class', '')
        status1.innerHTML = text
    },
    success: function(text = '成功', disable) {
        this.show(disable)
        daggerLoadingPane.setAttribute('class', 'success')
        status1.innerHTML = text
        setTimeout(
            function() {
                this.close()
            }.bind(this),
            950
        )
    },
    failure: function(text = '失败', disable) {
        this.show(disable)
        daggerLoadingPane.setAttribute('class', 'failure')
        status1.innerHTML = text
        setTimeout(
            function() {
                this.close()
            }.bind(this),
            950
        )
    },
    close: function() {
        daggerLoadingContent.style.display = 'none'
        bg.style.display = 'none'
    },
    show: function(disable) {
        daggerLoadingContent.style.display = 'block'

        if (disable) {
            bg.style.display = 'block'
        }
    },
}

import Vue from 'vue'
import Router from 'vue-router'
import demo from './demo.js'
import doc from './doc.js'



console.log(Router.prototype);

Vue.use(Router);

export default new Router({
    routes: [
        ...demo,
        ...doc
    ]
})

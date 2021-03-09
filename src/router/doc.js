export default [
    {
    path: '/',
    name: 'index',
    component: () => import ('@/pages/index.vue'),
    meta: {
        keepAlive: false,
        title: '首页'
    },
    children:[
        {
            path: '',
            name: 'home',
            component: () => import ('@/pages/website/index.vue'),
            meta: {
                keepAlive: false,
                title: '首页'
            },
            
        },
        {
            path: '/component',
            name: 'itv_doc_index',
            component: () => import ('@/pages/website/components/index.vue'),
            redirect:"/component/info/install",
            meta: {
                keepAlive: false,
                title: '文档'
            },
            children: [
                {
                    path: 'info/:type',
                    name: 'itv_doc_components_info',
                    component: () => import ('@/pages/website/components/info.vue'),
                    meta: {
                        keepAlive: false,
                        title: '首页'
                    }
                },
                {
                    path: 'doc/:type',
                    name: 'itv_doc_components',
                    component: () => import ('@/pages/website/components/doc.vue'),
                    meta: {
                        keepAlive: false,
                        title: '首页'
                    }
                }
            ]
        },
    ]
    },
]

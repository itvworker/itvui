export default [
    {
        path:'/demo',
        name:'itv_demo_index',
        component: () => import('@/pages/demo/index.vue'),
        redict:'itv_demo_enter',
        children:[
            {
                path: 'index',
                name: 'itv_demo_enter',
                component: () => import('@/pages/demo/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },
            },
            {
                path: '/demo/picker',
                name: 'itv_picker',
                component: () => import('@/components/picker/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'picker',
                },
            },
            {
                path: '/demo/actionsheet',
                name: 'itv_actionsheet',
                component: () => import('@/components/actionsheet/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'picker',
                },
            },
            {
                path: 'cliper',
                name: 'itv_cliper',
                component: () => import('@/components/cliper/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/toast',
                name: 'itv_toast',
                component: () => import('@/components/toast/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'toast',
                },
            },
            {
                path: '/demo/cell',
                name: 'itv_cell',
                component: () => import('@/components/cell/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/elevator',
                name: 'itv_elevator',
                component: () => import('@/components/elevator/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/slider',
                name: 'itv_slider',
                component: () => import('@/components/slider/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'slider',
                },
            },
            {
                path: '/demo/dialog',
                name: 'itv_dialog',
                component: () => import('@/components/dialog/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'dialog',
                },
            },
            {
                path: '/demo/popup',
                name: 'itv_popup',
                component: () => import('@/components/popup/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'popup',
                },
            },
            {
                path: '/demo/scroller',
                name: 'itv_scroller',
                component: () => import('@/components/scroller/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/slideout',
                name: 'itv_slideout',
                component: () => import('@/components/slideout/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/drawer',
                name: 'itv_drawer',
                component: () => import('@/components/drawer/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/slide-calendar',
                name: 'itv_slide-calendar',
                component: () => import('@/components/slide-calendar/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            // {
            //     path: '/demo/schedule',
            //     name: 'itv_slide_schedule',
            //     component: () => import('@/components/schedule/demo.vue'),
            //     meta: {
            //         keepAlive: false,
            //         title: 'schedule',
            //     },
            // },
            {
                path: '/demo/circle',
                name: 'itv_circle',
                component: () => import('@/components/circle/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'circle',
                },
            },
            {
                path: '/demo/swiper',
                name: 'itv_swiper',
                component: () => import('@/components/swiper/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'circle',
                },
            },
            {
                path: '/demo/popup',
                name: 'itv_popup',
                component: () => import('@/components/popup/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'popup',
                },
            },
            {
                path: '/demo/datetime',
                name: 'itv_datetime',
                component: () => import('@/components/datetime/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'datetime',
                },
            },
            {
                path: '/demo/datepicker',
                name: 'itv_datepicker',
                component: () => import('@/components/datepicker/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'datepicker',
                },
            },
            {
                path: '/demo/between-time',
                name: 'itv_between-time',
                component: () => import('@/components/between-time/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'dbetween-time',
                },
            },
            {
                path: '/demo/itvscroll',
                name: 'itv_scroll',
                component: () => import('@/components/itvscroll/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'itvscroll',
                },
            },
            {
                path: '/demo/calendar-time',
                name: 'itv_calendar-time',
                component: () => import('@/components/calendar-time/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'itvscroll',
                },
            },

            {
                path: '/demo/schedule',
                name: 'itv_schedule',
                component: () => import('@/components/schedule/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'schedule',
                }
            },
            {
                path: '/demo/slivers',
                name: 'itv_slivers',
                component: () => import('@/components/slivers/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'slivers',
                }
            },
            {
                path: '/demo/text2img',
                name: 'itv_text2img',
                component: () => import('@/components/text2img/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'text2img',
                }
            },
            

        ]
    },  
    

]

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    chrome: '58',
                    ie: '11',
                },
            },
        ],
    ],
    plugins: [
        'babel-plugin-remove-vconsole',
        '@babel/plugin-syntax-dynamic-import',
        [
            'babel-plugin-load-module',
            {
                cssPath: '@midea/pix-h5-components/dist/components/{key}/styles/{key}.css', //必须css路径
                jsPath: '@midea/pix-h5-components/dist/components/{key}', //js路径必须
                public: '@midea/pix-h5-components/dist/assets/fonts/iconfont.css', //公用css,可不传
                name: '@midea/pix-h5-components', //包名
            },
        ],
    ],
}

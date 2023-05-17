module.exports = function (api) {
    api.cache(true)

    const presets = [
        [
            '@babel/preset-env',
            { targets:{ chrome: '66' }},
        ],
        '@babel/preset-typescript', 
        '@babel/preset-react',
    ]

    const plugins = [
        // '@babel/plugin-proposal-class-properties',
        // '@babel/plugin-syntax-dynamic-import',
        [
            'babel-plugin-import',
            {
              libraryName: '@arco-design/web-react',
              libraryDirectory: 'es',
              camel2DashComponentName: false,
              style: true, // 样式按需加载
            },
        ]
    ]

    return { presets, plugins }
}

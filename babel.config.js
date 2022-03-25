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
    ]

    return { presets, plugins }
}

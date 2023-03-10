const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 7777,
        contentBase: './dist',
        disableHostCheck: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites: [{ from: /./, to: '/app.html' }]
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        allowedHosts: ['localhost', 'localhost:3001'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'window',
        publicPath: 'http://localhost:7777/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'title',
            favicon: 'favicon.ico',
            filename: 'app.html',
            template: 'src/template/app.html',
            chunks: ['app', 'vendors', 'runtime']
        })
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]'
                            },
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    /node_modules[\\/]antd/,
                    /node_modules[\\/]normalize\.css/,
                    /iconfont\.css$/
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            }
        ]
    }
})

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist/static'),
        // publicPath: require('./src/config.json').cdn
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                extractComments: true,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    safe: true,
                    discardComments: { removeAll: true }
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: '知音楼',
            favicon: 'favicon.ico',
            filename: '../index.html',
            template: 'src/views/index/index.html',
            chunks: ['index', 'vendors', 'runtime']
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    /node_modules[\\/]antd/,
                    /node_modules[\\/]normalize\.css/,
                    /node_modules[\\/]braft-editor/,
                    /iconfont\.css$/
                ],
                use: [
                    MiniCssExtractPlugin.loader,
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

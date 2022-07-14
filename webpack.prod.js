const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
            title: 'app1',
            favicon: 'favicon.ico',
            filename: '../app.html',
            template: 'src/template/app.html',
            chunks: ['app', 'vendors', 'runtime']
        }),
        // new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
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

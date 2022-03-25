const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const os = require('os')

module.exports = {
    entry: {
        index: './src/views/index/index.js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@a': path.resolve(__dirname, 'src/assets'),
            '@c': path.resolve(__dirname, 'src/components'),
            '@r': path.resolve(__dirname, 'src/redux')
        },
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}

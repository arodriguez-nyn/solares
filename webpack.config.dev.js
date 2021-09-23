const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const FileRules = {
    test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'static/fonts/',
            },
        },
    ],
}

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [FileRules],
    },
    output: {
        publicPath: '/',
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
})

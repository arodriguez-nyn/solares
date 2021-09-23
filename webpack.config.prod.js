const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const FontRules = {
    test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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

const ImgRules = {
    test: /\.(svg|png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'static/img/',
            },
        },
    ],
}

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [ImgRules, FontRules],
    },
    output: {
        publicPath: '/nynweb/',
    },
    optimization: {
        minimize: true,
    },
})

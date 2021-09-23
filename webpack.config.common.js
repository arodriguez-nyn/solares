const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BabelRules = {
    test: /\.(js)$/,
    use: ['babel-loader'],
    exclude: /node_modules/,
}

const CSSRules = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'nynweb/bundle.js',
        clean: true,
    },
    module: {
        rules: [BabelRules, CSSRules],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            componentes: path.resolve(__dirname, './src/componentes'),
            context: path.resolve(__dirname, './src/context'),
            pages: path.resolve(__dirname, './src/pages'),
            hooks: path.resolve(__dirname, './src/hooks'),
            services: path.resolve(__dirname, './src/services'),
            util: path.resolve(__dirname, './src/util'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
    ],
}

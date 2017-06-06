const path = require('path');
module.exports = {
    entry: './src/test.js',
    output: {
        path: path.resolve(__dirname, 'example/assets'),
        filename: 'test.js',
        publicPath: "./assets/",
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        },{
            test: /\.css$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }]
        },{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },{
            test: /\.(png|jpg|gif|woff|woff2|svg|eot|ttf)\??.*$/,
            loader: 'file-loader'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "tests"),
        compress: true,
        publicPath: "/assets/",
        port: 9004
    }
}

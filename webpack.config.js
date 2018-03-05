const path = require('path');
const webpack = require('webpack');
const buildDirectory = './build';

module.exports = {
    entry: [
        './src/index.js'
    ],
    devServer: {
        host: '127.0.0.1',
        port: '3000'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(buildDirectory),
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css?$/,
                loaders: [ 'style-loader', 'css-loader' ],
                include: __dirname
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ],
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    }
}
const path = require('path')
const webpack = require('webpack')

module.exports = {

    entry: {
        'index' : [ './examples/index.js' ],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
            },

            {
                test: /\.html?$/,
                exclude: /node_modules/,
                loader: "file?name=[path][name].html",
            },
        ]
    },
}

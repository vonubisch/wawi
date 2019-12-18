const path = require('path');
const glob = require('glob');

const webpack = require('webpack');

const getFilename = fileName => path.basename(fileName, path.extname(fileName));

const entries = {};
glob.sync('./src/*.js').forEach(path => entries[getFilename(path)] = path);

module.exports = {
    entry: entries,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            packages: path.resolve(__dirname, '../../packages/'),
            config: path.resolve(__dirname, '../../config/'),
            modules: path.resolve(__dirname, './node_modules/'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
};
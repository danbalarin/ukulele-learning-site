const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

var config = {
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    entry: [path.resolve(__dirname, './server/index.ts')],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                // because of node-gyp
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        plugins: [PnpWebpackPlugin],
        extensions: ['mjs', '.tsx', '.ts', '.js'],
        mainFields: ['main', 'module'], // because of GraphQL dependencies
    },
    resolveLoader: {
        plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
};

module.exports = config;

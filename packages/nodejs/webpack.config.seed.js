const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
    name: 'seed',
    target: 'node',
    externals: [nodeExternals()],
    entry: [path.resolve(__dirname, './server/seed.ts')],
    output: {
        filename: 'seed.js',
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
        new CleanWebpackPlugin(),
    ],
    stats: {
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false,
    },
};

module.exports = config;

const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

var commonPlugins = [
    new Dotenv(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
];

var config = {
    mode: 'development',
    module: {
        rules: [
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
            {
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
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['isomorphic-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/assets/',
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react'],
                            plugins: ['@loadable/babel-plugin'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
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
    stats: {
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        // source: false,
        // errors: false,
        // errorDetails: false,
        warnings: false,
        // publicPath: false,
    },
};

var client = Object.assign({}, config, {
    name: 'client',
    target: 'web',
    entry: [
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.resolve(__dirname, './client/index.tsx'),
    ],
    plugins: commonPlugins.concat([
        new LoadablePlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     generateStatsFile: true,
        // }),
    ]),
    output: {
        filename: 'static/js/[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'build/client/'),
        hotUpdateChunkFilename: 'hot/hot-update-client.js',
        hotUpdateMainFilename: 'hot/hot-update-client.json',
        publicPath: '/',
    },
});

var server = Object.assign({}, config, {
    name: 'server',
    target: 'node',
    plugins: commonPlugins,
    externals: [nodeExternals()],
    entry: [path.resolve(__dirname, './server/index.tsx')],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build/server/'),
        hotUpdateChunkFilename: 'hot/hot-update-server.js',
        hotUpdateMainFilename: 'hot/hot-update-server.json',
        publicPath: '/',
    },
});

module.exports = [client, server];

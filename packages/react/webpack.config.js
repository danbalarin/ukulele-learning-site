const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
    .default;
const styledComponentsTransformer = createStyledComponentsTransformer({
    ssr: true,
});

var config = {
    mode: 'development',
    // plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [styledComponentsTransformer],
                    }),
                },
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
            {
                test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
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
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
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
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        hotUpdateChunkFilename: 'hot/hot-update-client.js',
        hotUpdateMainFilename: 'hot/hot-update-client.json',
    },
});

var server = Object.assign({}, config, {
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    entry: [path.resolve(__dirname, './server/index.tsx')],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
        hotUpdateChunkFilename: 'hot/hot-update-server.js',
        hotUpdateMainFilename: 'hot/hot-update-server.json',
    },
});

module.exports = [client, server];

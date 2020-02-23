const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const path = require('path');
const nodeExternals = require('webpack-node-externals');

var config = {
    mode: 'development',
    // plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        plugins: [PnpWebpackPlugin],
        extensions: ['.tsx', '.ts', '.js'],
    },
    resolveLoader: {
        plugins: [PnpWebpackPlugin.moduleLoader(module)],
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

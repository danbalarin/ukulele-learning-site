const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

const webpack = {
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                resolve: {
                    extensions: ['.ts', '.tsx', '.js'],
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react'],
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: 'file-loader',
            },
            {
                test: /\.stories\.tsx?$/,
                loaders: [
                    {
                        loader: require.resolve('@storybook/source-loader'),
                        options: { parser: 'typescript' },
                    },
                ],
                enforce: 'pre',
            },
        ],
    },
};

async function yarn2Config(config, options) {
    const newConfig = {
        ...(config || {}),
        resolve: {
            ...((config || {}).resolve || {}),
            plugins: [
                ...(((config || {}).resolve || {}).plugins || []),
                PnpWebpackPlugin,
            ],
        },
        resolveLoader: {
            ...((config || {}).resolveLoader || {}),
            plugins: [
                ...(((config || {}).resolveLoader || {}).plugins || []),
                PnpWebpackPlugin.moduleLoader(module),
            ],
        },
    };

    const jsRule = newConfig.module.rules.find(rule => rule.test.test('.js'));
    jsRule.exclude = /node_modules/;

    return newConfig;
}

const webpackFinal = config => {
    return {
        ...config,
        module: { ...config.module, rules: webpack.module.rules },
    };
};

module.exports = {
    managerWebpack: yarn2Config,
    webpack: yarn2Config,
    webpackFinal,
    addons: [
        '@storybook/addon-storysource',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions/register',
    ],
};

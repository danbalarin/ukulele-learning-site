// Webpack for Storybook

module.exports = {
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
        ],
    },
};

const path = require('path');

module.exports = function(env, argv) {
    // default to the server configuration
    const base = {
        entry: './src/server/index.ts',
        output: {
            filename: 'js/server.js',
            // path needs to be an ABSOLUTE file path
            path: path.resolve(process.cwd(), 'dist'),
            publicPath: '/',
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: 'cheap-module-eval-source-map',
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                },
            ],
        },
    };

    // server-specific configuration
    if (env.platform === 'server') {
        base.target = 'node';
    }

    // client-specific configurations
    if (env.platform === 'web') {
        base.entry = './src/clientEntry.tsx';
        base.output.filename = 'js/client.js';
    }

    return base;
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    resolver: require.resolve(`jest-pnp-resolver`),
    transform: {
        // '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    globals: {
        'ts-jest': {
            packageJson: 'package.json',
        },
    },
    moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js'],
};

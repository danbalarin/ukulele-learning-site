module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    resolver: require.resolve(`jest-pnp-resolver`),
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        // '^.+\\.tsx?$': 'ts-jest',
    },
};

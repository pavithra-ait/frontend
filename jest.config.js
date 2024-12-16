const jest = {
    transformIgnorePatterns: [
        '/node_modules/(?!your-library-name)/',
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};

export default jest;
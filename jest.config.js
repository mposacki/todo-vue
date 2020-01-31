module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
    ],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.(vue)$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    testMatch: [
        '**/tests/**/*.(test|spec).(js|jsx|ts|tsx)|**/__tests__/*.(test|spec).(js|jsx|ts|tsx)',
    ],
};

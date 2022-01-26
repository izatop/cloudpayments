module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {},
    globals: {
        "ts-jest": {
            tsconfig: "test/tsconfig.json",
        },
    },
    roots: [
        "<rootDir>/test",
    ],
};

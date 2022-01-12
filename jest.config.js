module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: "test/tsconfig.json",
        },
    },
    roots: [
        "<rootDir>/test",
    ],
};

const path = require('path');

module.exports = {
    mode: "production", // "production" | "development" | "none"
    entry: path.resolve(__dirname, "test/index.ts"),
    output: {
        path: path.resolve(__dirname, "test/dist"), // string,
        filename: 'test.bundle.js'
    }
};
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          browsers: ['ie 11'],
        },
        corejs: {
          version: 3,
          proposals: false,
        },
      },
    ],
  ],
  plugins: [['@babel/plugin-transform-runtime', { helpers: false }]],
};

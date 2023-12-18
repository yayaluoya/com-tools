const path = require('path');

/** webpack参数 */
const webpackConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/web/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  target: ['web', 'es5'], // 必须
  //源代码调试工具
  devtool: 'inline-source-map',
  // 缓存
  cache: true, // boolean
  // 禁用/启用缓存
  watch: true, // boolean
  // 启用观察
  watchOptions: {
    // 限制并行处理模块的数量
    aggregateTimeout: 1000, // in ms
    poll: 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares（译者注：Network FileSystem，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
    ignored: /node_modules/, //忽略时时监听
  },
  // 自动打包运行
  // devServer: {
  //     contentBase: path.resolve(__dirname, "./bin"),
  //     compress: true,
  //     port: 3000,
  //     open: true,
  // },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = webpackConfig;

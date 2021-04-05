const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { isDev, PROJECT_PATH } = require('../constants');

const { resolve } = path;

const getCssLoaders = importLoaders => [
  // 'style-loader',
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          // 修复一些和 flex 布局相关的 bug
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-normalize'),
        ],
      },
      sourceMap: isDev,
    },
  },
];

// 初始化 plugin
const plugins = [
  new HtmlWebpackPlugin({
    template: resolve(PROJECT_PATH, './public/index.html'),
    filename: 'index.html',
    cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
    favicon: resolve(PROJECT_PATH, './public/favicon.ico'),
    minify: isDev
      ? false
      : {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          useShortDoctype: true,
        },
  }),
  new webpack.ProvidePlugin({
    $request: [resolve('src/utils/request.tsx'), 'default'],
    $message: [resolve('node_modules/antd/es/message/index.js'), 'default'],
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: resolve(PROJECT_PATH, './tsconfig.json'),
    },
  }),
  new WebpackBar({
    name: isDev ? '正在启动' : '正在打包',
    color: '#3ca21b',
  }),
  // 添加包注释
  new webpack.BannerPlugin({
    raw: false, // if true, banner will not be wrapped in a comment
    banner: 'hello world',
  }),
  // 生成打包分析
  new BundleAnalyzerPlugin({
    analyzerMode: 'static', // 以静态文件查看报告
    analyzerHost: '127.0.0.1', // host 设置
    analyzerPort: 6666, // 端口号设置
    openAnalyzer: false,
  }),
];

// 动态判断是否对 css 进行压缩
if (!isDev) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  );
}

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    path: resolve(PROJECT_PATH, './dist'),
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    assetModuleFilename: 'images/[hash][ext][query]', // 配合图片等静态资源
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      src: resolve(PROJECT_PATH, './src'),
      scripts: resolve(PROJECT_PATH, './scripts'),
      components: resolve(PROJECT_PATH, './src/components'),
      utils: resolve(PROJECT_PATH, './src/utils'),
      layouts: resolve(PROJECT_PATH, './src/layouts'),
      pages: resolve(PROJECT_PATH, './src/pages'),
      router: resolve(PROJECT_PATH, './src/router'),
      assets: resolve(PROJECT_PATH, './src/assets'),
    },
  },
  plugins,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      // js 压缩
      !isDev &&
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: { pure_funcs: ['console.log'] },
          },
        }),
      !isDev && new CssMinimizerPlugin(), // css 压缩
    ].filter(Boolean), // 根据 Boolean 值，动态判断是否使用插件

    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|ts|js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
              // lessOptions: {
              //   javascriptEnabled: true,
              // },
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  'primary-color': '#05c494',
                  'link-color': '#05c494',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

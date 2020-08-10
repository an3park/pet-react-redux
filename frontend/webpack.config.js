const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (env = {}) => {
  const isProd = !env.dev
  const isDev = !isProd
  isDev && console.log('=== DEV MODE ===')

  const filename = ext => (isDev ? `[name].${ext}` : `[hash].${ext}`)

  const cssLoaders = ['style-loader', 'css-loader']
  const plugins = [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
  if (isProd) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    entry: {
      index: './index'
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
      alias: {
        '@interfaces': path.resolve(__dirname, '..', 'interfaces')
      }
    },
    devServer: {
      port: 8080,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
    optimization: isDev
      ? {}
      : {
          minimize: true,
          minimizer: [new TerserPlugin()]
        },
    plugins,
    module: {
      rules: [
        {
          test: /\.(woff2?)$/,
          use: 'file-loader'
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: /\.s[ac]ss$/,
          use: [...cssLoaders, 'sass-loader']
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          ]
        }
      ]
    }
  }
}

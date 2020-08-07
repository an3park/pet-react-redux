const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env = {}) => {
  const isDev = !!env.dev
  isDev && console.log('=== DEV MODE ===')

  const filename = ext => (isDev ? `[name].${ext}` : `[hash].${ext}`)

  const cssLoaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ]

  const jsLoaders = []

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
      alias: {}
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
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css')
      })
    ],
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
                presets: ['@babel/preset-env', '@babel/preset-react']
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
                ]
              }
            }
          ]
        }
      ]
    }
  }
}

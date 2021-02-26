const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env) => {
  const isProduction = env.production === true

  return {
    context: path.resolve(process.cwd(), 'src'),
    devtool: isProduction ? false : 'eval-cheap-source-map',
    mode: isProduction ? 'production' : 'development',

    entry: path.resolve(__dirname, '../src/index.ts'),

    output: {
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: 'img/[name].[hash:7][ext]'
    },

    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': 'src/',
        vue: '@vue/runtime-dom'
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }
          ]
        },
        {
          test: /\.styl(us)?$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '../index.html',
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[hash].css' : '[name].css'
      }),
      new VueLoaderPlugin()
    ],

    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true
    }
  }
}

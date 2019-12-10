const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'../dist')
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ],

}
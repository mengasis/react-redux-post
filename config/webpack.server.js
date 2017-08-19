const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
require('babel-polyfill')

module.exports = {
	entry: ['babel-polyfill', './src/server.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?module'
				})
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				}
			}
		]
	},
	target: 'node',
	plugins: [
		new ExtractTextPlugin('../dist/static/styles.css')
	]
}
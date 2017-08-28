const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: ['babel-polyfill', './src/client.js'],
	output: {
		filename: 'app.js',
		path: path.resolve('dist/static')
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
						presets: ['env', 'react'],
						plugins: ['transform-es2015-modules-commonjs']					}
				}
			}
		]
	},
	target: 'web',
	plugins: [
		new ExtractTextPlugin('../static/styles.css')
	]
}
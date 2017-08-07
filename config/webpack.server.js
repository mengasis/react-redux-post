const path = require('path')
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
				use: [
					'style-loader',
					'css-loader'
				]
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
	target: 'node'
}
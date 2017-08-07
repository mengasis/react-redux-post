const path = require('path')

module.exports = {
	entry: './src/client.js',
	output: {
		filename: 'app.js',
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
	target: 'web'
}
const path = require('path')

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
						presets: ['env', 'react'],
						plugins: ['transform-es2015-modules-commonjs']					}
				}
			}
		]
	},
	target: 'web'
}
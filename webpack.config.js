module.exports = {
	entry: './main.js',
	output: {
		path: './dist/assets',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015']
			}
		}]
	},
	devtool: 'source-map-inline'
};

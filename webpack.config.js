import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import sass from "sass-embedded";

export default {
	entry: "./src/scripts/index.js",

	output: {
		path: path.resolve("dist"),
		filename: "bundle.js",
		clean: true,
		publicPath: ""
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				resourceQuery: /inline/,
				use: [
					'raw-loader',
					{
						loader: 'sass-loader',
						options: { 
							implementation: sass,
							additionalData: `@import '../styles/_variables.scss';`
						}
					}
				]
			},
			{
				test: /\.scss$/,
				resourceQuery: { not: [/inline/] },
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: { implementation: sass }
					}
				]
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	],

	resolve: {
		extensions: [".js"]
	},

	devServer: {
		static: {
			directory: path.resolve(process.cwd(), 'src'),
			watch: true
		},
		hot: true,
		open: true,
		client: { overlay: false }
	},
};
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 5500,
    },
    entry: './src/app.js',
    module: {
    	rules: [
      		{ test: /\.svg$/, use: 'svg-inline-loader' },
      		{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      		{
        		test: /\.(woff|woff2|eot|ttf|otf)$/i,
            		type: 'asset/resource',
      		},
      		{
			test: /\.js$/,
			enforce: "pre",
			use: ["source-map-loader"],
      		},
      		{
				test:/\.(s*)css$/,
				use: [
				   miniCss.loader,
				   'css-loader',
				   'sass-loader',
				]
			}
    	]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
    	new HtmlWebpackPlugin({
    		filename: "calendarm.html",
      		template: "./src/calendarm.html",
      	}),
    	new CleanWebpackPlugin(),
    	new CopyPlugin({
      		patterns: [{
       	    from: "./src/img/",
        	    to: path.resolve(__dirname, "dist/img")
      		}],
    	}),
    	new webpack.HotModuleReplacementPlugin(),
    	new miniCss({
			filename: 'style.css',
		 }),
    ]
};

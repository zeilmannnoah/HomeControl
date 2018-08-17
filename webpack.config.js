const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = env => {
    env = env || {};
    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: 'home-control.bundle.js',
            sourceMapFilename: 'finalproject.bundle.map.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
					test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
					loader: 'url-loader'
				}
            ],
            noParse: [
                /aws/
            ]
        },
        devtool: '#source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        mode: 'development',
        devServer: {
            contentBase: './dist',
            historyApiFallback: true
        },
        node: {
            fs: 'empty',
            child_process: 'empty'
        }
    }
}
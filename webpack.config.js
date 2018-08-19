const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputDirectory = 'dist'

module.exports = (env) => {
    env = env || {};
    return {
        entry: './src/client/client.js',
        output: {
            path: path.resolve(__dirname, outputDirectory),
            filename: 'home-control.bundle.js',
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
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
					test: /\.(woff|woff2|ttf|eot|svg|)$/i,
					loader: 'url-loader'
				}
            ],
        },
        plugins: [
            new CleanWebpackPlugin([outputDirectory]),
            new HtmlWebpackPlugin({
                template: './src/public/index.html'
            })
        ],
        devServer: {
            port: 3000,
            open: true,
            historyApiFallback: true,
            proxy: {
                '/api': 'http://localhost:8080'
            }
        }
    }
};
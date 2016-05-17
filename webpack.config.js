// TODO add CommonsChunkPlugin, description: https://github.com/webpack/docs/wiki/optimization
// TODO https://github.com/thejameskyle/babel-react-optimize

var path = require('path');
var webpack = require('webpack');

var profile = process.env.npm_config_profile;

console.log("Webpack using profile: " + profile);
console.log("Webpack NODE_ENV: " + process.env.NODE_ENV);

var sourcePath = path.join(__dirname, 'src/main/resources/assets');


var commonPlugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
];

var plugins;

switch (profile) {
    case "dev":
    {
        plugins = commonPlugins;
        break;
    }
    default:
    {
        plugins = commonPlugins.concat([
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            })
        ]);
    }
}

module.exports = {
    entry: {
        'js/pages/index_page': "js/pages/index_page"
    },
    output: {
        path: path.join(__dirname, 'build/resources/main/assets'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        root: sourcePath
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?cacheDirectory'],
                include: sourcePath
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|woff|woff2|eot|ttf|svg)/, loader: 'url-loader?limit=100000' }
        ]
    }
};
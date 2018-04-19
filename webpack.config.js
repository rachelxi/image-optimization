const path = require('path');
const webpack = require('webpack');

function root(__path){
    return path.join(__dirname, __path);
}

module.exports = {
    entry: {
        'app.bundle': './src/main.js' 
    },
    output: {
        path: root('dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            ['transform-es2015-modules-commonjs', {
                                'allowTopLevelThis': true
                            }],
                            ['transform-class-properties', {
                                'spec': true
                            }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    ]
};
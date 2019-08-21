"use strict";

const path = require('path');
const webpack = require('webpack');
const baseDir = path.resolve(__dirname,'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



const PATHS = {
    "src":path.resolve("./","./boot.js"),
    "dist":path.resolve("./",".")    
};

module.exports = {
    mode: 'development',
    entry:PATHS.src,
    
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }

            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.(hbs|handlebars)$/,
                exclude: /node_modules/,
                use:'handlebars-loader'
            }           
        ]
    },
    devServer: {
        contentBase: path.resolve("./","dist")
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'AYSTM',
            inject: "body",
            meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            template: path.resolve("./",'./templates/index.html')
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve("./","dist")
    }, 
};
/**
 * Created by 41533 on 2019/6/28.
 */
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV ==='development';
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config =
    {
        target: 'web',
        entry: path.join(__dirname, '../src/main.js'),
        output: {
            filename:
                'bundle.[hash:8].js',
            path: path.join(__dirname, '../dist/')
        },
        module: {
//规定文件类型加载的 loader
rules: [
{
    test:/\.vue$/,
        loader:'vue-loader'

},
{
    test:/\.jsx$/,
       loader:'babel-loader'

},
{
    test:/\.(gif|jpg|jpeg|png|svg)$/,
        use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-custom.[ext]'

                    }
                }
            ]
}
]
},
plugins: [
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        filename: 'index.html'
    }),
    new VueLoaderPlugin(),
]
}

if (isDev) {
    config.mode = 'development'
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
                            port:
                                '8080'
                            ,
                            host:
                                '0.0.0.0',
                    //相比 localhost ，可以适用于局域网
        overlay: {
                            errors: true
                        },
        hot: true   //热加载
         }
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()
    )
    config.module.rules.push(
        {
            test:
                /\.css$/
            ,
            use: [
                'style-loader', 'css-loader'
            ]
        },
        {
            test:
                /\.less$/
            ,
            use: [

                'style-loader'
                ,

                'css-loader'
                ,
                {
                    loader:
                        'postcss-loader'
                    ,
                    options: { sourceMap: true }
                },

                'less-loader'

            ]
        }
    )
} else {
    config.mode
        = 'production'

    config.entry = {
                        app: path.join(__dirname,
                            '../src/main.js'
                        ),
                        vendor: [
                            'vue'
                        ]
                    }
    config.output.filename = '[name].[chunkhash:8].js'

    config.module.rules.push(
        {
            test:
                /\.css$/
            ,
            use: [
                'style-loader', 'css-loader'
            ]
        },
        {
            test:
                /\.less$/
            ,
            use: extractPlugin.extract({
                fallback:
                    'style-loader'
                ,
                use: [

                    'css-loader'
                    ,
                    {
                        loader:
                            'postcss-loader'
                        ,
                        options: { sourceMap: true }
                    },

                    'less-loader'

                ]
            })
        }
    )
    config.plugins.push(new
    extractPlugin('styles.[chunkhash:8].css'
    ))
    config.optimization
        =
        {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name:
                            'vendor'

                    }
                }
            },
            runtimeChunk: true
        }
}
module.exports
    = config
module.exports = {
    entry: "./sourses/hentai_images.js",
    target: 'web',
    output: {
        path: __dirname + "/dist",
        filename: "hentai.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json","*"],
        modules: ["node_modules"]
    },
    module: {
        loaders: [
            { 
                test: /\.html$/, 
                loader: "html"
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    node: {
        fs: "empty",
        child_process: "empty"
    }
}
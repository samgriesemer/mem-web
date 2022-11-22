module.exports = {
    configureWebpack: {
        entry: {
            'main': './src/main.js',
            'mainslim': './src/mainslim.js',
            'article_embed': './src/article_embed.js',
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        }
    },
    css: {
        extract: {
          //ignoreOrder: true,
          filename: 'css/[name]-style.css',
          chunkFilename: 'css/[name]-chunk.css',
        },
    },
};

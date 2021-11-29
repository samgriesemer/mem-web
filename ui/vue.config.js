module.exports = {
    configureWebpack: {
        entry: {
            'main': './src/main.js',
            'mainslim': './src/mainslim.js',
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        }
    },
    css: {
        extract: {
          //ignoreOrder: true,
          filename: 'css/style.css',
          chunkFilename: 'css/[name]-chunk.css',
        },
    },
};

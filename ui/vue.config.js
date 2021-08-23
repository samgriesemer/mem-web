module.exports = {
    configureWebpack: {
        output: {
            filename: 'js/main.js',
            chunkFilename: 'js/chunk.js'
        }
    },
    css: {
        extract: {
          //ignoreOrder: true,
          filename: 'css/style.css',
          chunkFilename: 'css/[name]-chunk-css',
        },
    },
};

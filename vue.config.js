module.exports = {
    chainWebpack: (config) => {
        config.output
            .filename(`js/[name].[hash:8].js`)
            .chunkFilename(`js/[name].[hash:8].js`);
    },
};

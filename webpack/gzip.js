const Abstract = require('./abstract');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const gzipExtensions = ['js', 'css'];
module.exports = class Gzip extends Abstract {
    chainWebpack (config) {
        if (!this.isDevelopment()) {
            config.plugin('gzip').use(CompressionWebpackPlugin, [{
                algorithm: 'gzip',
                test: new RegExp(`\\.(${gzipExtensions.join('|')})$`),
                threshold: 10240,
                minRatio: 0.8
            }]);
        }
    }
};

const Abstract = require('./abstract');
module.exports = class Cdn extends Abstract {
    chainWebpack (config) {
        if (!this.isDevelopment()) {
            config.externals({
                'vue': 'Vue',
                'vuex': 'Vuex',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'crypto-js/crypto-js': 'CryptoJS',
                'jsencrypt/bin/jsencrypt': 'JSEncrypt',
                'echarts': 'echarts',
                'vant': 'vant',
                'moment': 'moment',
                'lodash': '_',
                'Swiper': 'Swiper',
                'vue-awesome-swiper': 'VueAwesomeSwiper'
            });
        }
    }
};

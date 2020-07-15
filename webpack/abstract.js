module.exports = class Abstract {
    isEnv (env) {
        return process.env.NODE_ENV === env;
    }

    isDevelopment () {
        return this.isEnv('development');
    }

    isProduction () {
        return this.isEnv('production');
    }

    configureWebpack () {}

    chainWebpack () {}

    merge (config) {
        return config;
    }
};

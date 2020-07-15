const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const { readDirSync } = require('./src/es5.util');
const webpackFiles = readDirSync(path.resolve(__dirname, './webpack'), (filename) => !filename.endsWith('abstract.js'));
const webpackConfigs = webpackFiles.map(file => require(file)).map(f => Reflect.construct(f, []));
let webpackConfig = {
    productionSourceMap: false,
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
        }
        config.plugins.push(new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: ['/', '/about'],
            postProcess: (renderedRoute) => {
                renderedRoute.html = renderedRoute.html.replace('id="app"', 'id="app" data-server-rendered="true"');
                return renderedRoute;
            },
            minify: {
                minifyCSS: true,
                collapseWhitespace: true
            },
            renderer: new Renderer({
                headless: false,
                ignoreJSErrors: true,
                renderAfterDocumentEvent: 'render-event'
            })
        }));
        webpackConfigs.forEach(c => c.configureWebpack(config));
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV !== 'development') {
            config.output.filename('[name].[hash].js').chunkFilename('js/[name].[hash].js').end();
        }
        webpackConfigs.forEach(c => c.chainWebpack(config));
    },
    devServer: {
        port: 9095
    }
};

webpackConfigs.forEach(c => {
    webpackConfig = c.merge(webpackConfig);
});
module.exports = webpackConfig;

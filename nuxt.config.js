const { resolve } = require('path');

module.exports = {
    mode: 'spa',
    /*
  ** Headers of the page
  */
    resolve: {
        extensions: ['.js', '.json', '.vue', '.ts'],
        root: resolve(__dirname),
        alias: {
            '@': resolve(__dirname),
            '~': resolve(__dirname),
        },
    },
    head: {
        title: 'Portfolio Page',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '안녕하세요. 프론트 엔드 웹 개발자 Nekoromancer 입니다.' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
            { name: 'theme-color', content: '#000000' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
            { rel: 'preconnect', href: 'https://ajax.googleapis.com' },
            { rel: 'preload', href: '/fonts.css', as: 'style' },
            { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
            { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
            { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
            { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
            { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
            { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
            { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
            { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/manifest.json' },
        ],
    },
    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },
    /*
  ** Global CSS
  */
    css: [
        '~/assets/style/global.scss',
    ],
    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '~/plugins/onReady.mixin.js',
    ],
    /*
  ** Nuxt.js dev-modules
  */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
    ],
    /*
  ** Nuxt.js modules
  */
    modules: [
        '@nuxtjs/style-resources',
        'nuxt-fontawesome',
    ],
    /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
    axios: {
    },
    /*
  ** Build configuration
  */
    build: {
    /*
    ** You can extend webpack config here
    */
        extend (config) {
            config.module.rules.push({
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            });
        },
    },
    styleResources: {
        scss: [
            '~/assets/style/variables.scss',
        ],
    },
};

const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/@mf-types/**'],
    };
    // build remote URLs from env variables so deployments can
    // override where each app is hosted
    const homeUrl =
      process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000';
    const shopUrl =
      process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:3001';
    const checkoutUrl =
      process.env.NEXT_PUBLIC_CHECKOUT_URL || 'http://localhost:3002';

    const remotes = {
      checkout: `checkout@${checkoutUrl}/_next/static/${
        isServer ? 'ssr' : 'chunks'
      }/remoteEntry.js`,
      home_app: `home_app@${homeUrl}/_next/static/${
        isServer ? 'ssr' : 'chunks'
      }/remoteEntry.js`,
      shop: `shop@${shopUrl}/_next/static/${
        isServer ? 'ssr' : 'chunks'
      }/remoteEntry.js`,
    };

    config.plugins.push(
      new NextFederationPlugin({
        name: 'home_app',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shop: remotes.shop,
          checkout: remotes.checkout,
        },
        exposes: {
          './SharedNav': './components/SharedNav',
          './menu': './components/menu',
        },
        shared: {
          'lodash/': {},
          antd: {
            requiredVersion: '5.19.1',
            version: '5.19.1'
          },
          '@ant-design/': {
            singleton: true,
            // layer: config.isServer ? 'pages-dir-node' : 'pages-dir-browser',
            // issuerLayer: config.isServer ? 'pages-dir-node' : 'pages-dir-browser'
          },
        },
        extraOptions: {
          debug: false,
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      }),
    );
    config.plugins.push({
      name: 'xxx',
      apply(compiler) {
        compiler.options.devtool = false;
      },
    });
    return config;
  },
};

module.exports = nextConfig;

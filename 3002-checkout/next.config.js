const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/@mf-types/**'],
    };
    const homeUrl =
      process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000';
    const shopUrl =
      process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:3001';
    const checkoutUrl =
      process.env.NEXT_PUBLIC_CHECKOUT_URL || 'http://localhost:3002';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          home: `home_app@${homeUrl}/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
          shop: `shop@${shopUrl}/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        exposes: {
          './CheckoutTitle': './components/CheckoutTitle',
          './ButtonOldAnt': './components/ButtonOldAnt',
          './menu': './components/menu',
        },
        shared: {
          'lodash/': {},
          antd: {
            requiredVersion: '5.19.1',
            version: '5.19.1',
          },
          '@ant-design/': {
            singleton: true,
          },
        },
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
          automaticPageStitching: false,
        },
      }),
    );
    return config;
  },
};

module.exports = nextConfig;

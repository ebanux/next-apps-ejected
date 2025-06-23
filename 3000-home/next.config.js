const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:3001';
    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'http://localhost:3002';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'home_app',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shop: `shop@${shopUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          checkout: `checkout@${checkoutUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
        },
        exposes: {
          './page': './pages/index'
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true }
        },
        extraOptions: {
          exposePages: true
        }
      })
    );

    return config;
  }
};

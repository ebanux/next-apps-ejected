const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000';
    const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:3001';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          home_app: `home_app@${homeUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          shop: `shop@${shopUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
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

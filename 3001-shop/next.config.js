const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000';
    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'http://localhost:3002';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          home_app: `home_app@${homeUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
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

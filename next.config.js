const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withOffline = require('next-offline');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const appConfig = require('./app.config');

const isProd = process.env.NODE_ENV === 'production';
const cdnHost = process.env.CDN_HOST || false;

const { compress, http2 } = appConfig;
let useCompress = compress;
if (http2) {
  useCompress = false;
}

const configPlugins = [[withBundleAnalyzer], [withPWA]];

const headers = [
  {
    key: 'Strict-Transport-Security',
    value: `max-age=${appConfig.stsMaxAge}; includeSubDomains; preload`,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig = {
  // reactStrictMode: true,
  assetPrefix: isProd && cdnHost ? cdnHost : '',
  compress: useCompress,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/',
        headers,
      },
      {
        source: '/:all*',
        headers,
      },
    ];
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: './bundle-report/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundle-report/client.html',
    },
  },
  pwa: {
    disable: !isProd,
    dest: 'public',
    runtimeCaching,
  },
  webpack: (config, { defaultLoaders }) => {
    //  SVG support
    // Override nextjs' svg rules so that we can use custom loader
    // https://github.com/gregberge/svgr/issues/361#issuecomment-594870635
    config.module.rules.forEach((rule) => {
      if (rule.test !== undefined && rule.test.source.includes('|svg|')) {
        rule.test = new RegExp(rule.test.source.replace('|svg|', '|'));
      }
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

if (appConfig.serviceWorkerEnabled) {
  nextConfig.workboxOpts = {
    // https://developers.google.com/web/tools/workbox/modules/workbox-strategies
    runtimeCaching: [
      {
        urlPattern:
          /^https:\/\/((?!facebook|bing|criteo|teads|dwin1|awin1|adnxs|trackedlink|adviva|mathtag|doubleclick|googleadservices|apis|google.com|google-analytics.com|monetate|wcs\/resources).)*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offline-cache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
      {
        urlPattern: /_next\/static/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 7,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'images',
          expiration: {
            maxAgeSeconds: 60 * 60 * 7,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  };
  configPlugins.push([withOffline]);
}

module.exports = withPlugins([...configPlugins], nextConfig);

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(nextConfig, null, 2));

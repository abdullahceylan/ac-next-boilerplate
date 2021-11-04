const aliases = {
  '@components': './src/components',
  '@styles': './layouts/styles',
  '@theme': './layouts/theme',
  '@layouts': './layouts',
  '@config': './src/config',
  '@utils': './src/utils',
};

module.exports = {
  presets: ['next/babel'],
  env: {
    development: {
      plugins: [
        ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }],
        '@babel/transform-react-jsx-source',
        'inline-react-svg',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        [
          'module-resolver',
          {
            alias: {
              ...aliases,
            },
          },
        ],
      ],
    },
    production: {
      plugins: [
        ['babel-plugin-styled-components', { ssr: true, displayName: false, preprocess: false }],
        'transform-remove-console',
        'inline-react-svg',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@components': './src/components',
              '@layouts': './layouts',
              '@utils': './src/utils',
              '@store': './src/store',
              '@hooks': './src/hooks',
              '@public': './public',
              '@pages': './pages',
              '@server': './server',
            },
            extensions: ['.js', '.jsx'],
          },
        ],
      ],
    },
    test: {
      presets: [['next/babel', { 'preset-env': { targets: { node: 'current' } } }]],
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        'dynamic-import-node',
      ],
    },
  },
};

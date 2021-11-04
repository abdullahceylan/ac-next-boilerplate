module.exports = {
  extends: ['@abdullahceylan/eslint-config', '@abdullahceylan/eslint-config-react'],
  parser: 'babel-eslint',
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      'babel-module': {
        extensions: ['.js'],
        alias: {
          '@layouts': './layouts',
          '@public': './public',
          '@store': './src/store',
          '@utils': './src/utils',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@pages': './pages',
          '@server': './server',
          '@styles': './layouts/styles',
          '@theme': './layouts/theme',
        },
      },
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    //   'react/jsx-wrap-multilines': [
    //     'error',
    //     { declaration: false, assignment: false },
    //   ],
    'import/prefer-default-export': 0,
    //   'react/prop-types': 0,
    //   camelcase: 0,
    //   'no-plusplus': 0,
    //   'no-underscore-dangle': ['error', { allow: ['_peername'] }],
    //   'react/require-default-props': 0,
    //   'no-console': 'off',
    //   'import/extensions': [
    //     'error',
    //     'ignorePackages',
    //     {
    //       js: 'never',
    //       jsx: 'never',
    //       ts: 'never',
    //       tsx: 'never',
    //       mjs: 'never',
    //     },
    //   ],
    //   'react/destructuring-assignment': [
    //     0,
    //     'always',
    //     { ignoreClassFields: true },
    //   ],
    //   'react/sort-comp': [
    //     1,
    //     {
    //       order: ['constructor', 'lifecycle', 'everything-else', 'render'],
    //     },
    //   ],
    //   'jsx-a11y/anchor-is-valid': [
    //     'error',
    //     {
    //       components: ['Link'],
    //       specialLink: ['hrefLeft', 'hrefRight'],
    //       aspects: ['invalidHref', 'preferButton'],
    //     },
    //   ],
  },
};

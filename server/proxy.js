module.exports = {
  '/api': {
    target: 'https://api.nasa.gov',
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
  },
};

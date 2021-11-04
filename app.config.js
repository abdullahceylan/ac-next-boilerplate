let useSSL = false;

if (process.env.USE_SSL) {
  useSSL = true;
}

module.exports = {
  staticPath: 'public',
  serverPort: 3000,
  http2: false,
  compress: true,
  // Activate SSL only for dev environment
  // otherwise it causes to a conflict with the deployment
  ssl: useSSL,
  amp: true,
  serviceWorkerEnabled: false,
  stsMaxAge: 31536000, // Setting Strict-Transport-Security max-age to 1 year
};

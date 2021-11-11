import App from 'next/app';
import Head from 'next/head';
class ACApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>AC React, next.js</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default ACApp;

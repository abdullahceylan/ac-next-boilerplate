import 'tailwindcss/tailwind.css';

import App from 'next/app';
import { DefaultSeo } from 'next-seo';

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
        <DefaultSeo
          titleTemplate="%s | ac-next-boilerplate"
          defaultTitle="ac-next-boilerplate"
          description="NextJS with Tailwind boilerplate"
        />
        <Component {...pageProps} />
      </>
    );
  }
}

export default ACApp;

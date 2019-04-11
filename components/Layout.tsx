import * as React from 'react';
import Head from 'next/head';
import Header from './Header';

type Props = {
  title?: string,
};

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  fontFamily: 'Verdana, Geneva, sans-serif'
};

const Layout: React.FunctionComponent<Props> = ({ children, title = 'Default Title' }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
  </div>
);

export default Layout;

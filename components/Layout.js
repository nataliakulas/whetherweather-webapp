import React from 'react';
import Head from 'next/head';

export default ({children, title = 'Whether Weather'}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Head>
    {children}
  </div>
)
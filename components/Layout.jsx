import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import colors from '../shared/colors';
import theme from '../shared/theme';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${theme.light};
`;

const Layout = ({ children, title}) => (
  <ThemeProvider theme={colors}>
    <div>
      <Head>
        <title>
          {title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Wrapper>
        {children}
      </Wrapper>
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Layout;

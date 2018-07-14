import React from "react";
// import { Container, Row, Col } from 'react-grid-system';
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import colors from "../shared/colors";

import { BackgroundWrapper, ViewWrapper, NavigationWrapper } from './Wrappers';

import Display from './Display';

const Layout = ({ children, title }) => (
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
      <BackgroundWrapper>
        <Display />
        <NavigationWrapper>
          <ul>
            <li>
              Home
            </li>
          </ul>
        </NavigationWrapper>
        <ViewWrapper>
          {children}
        </ViewWrapper>
      </BackgroundWrapper>
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // display: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Layout;

import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import colors from "../shared/colors";

import { BackgroundWrapper, ViewWrapper } from './Wrappers';

import Display from './Display';
import Navigation from './Navigation';


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
        <Container>
          <Row nogutter>
            <Col xs={12} md={4}>
              <Display />
            </Col>
            <Col xs={12} md={2}>
              <Navigation />
            </Col>
            <Col xs={12} md={6}>
              <ViewWrapper>
                {children}
              </ViewWrapper>
            </Col>
          </Row>
        </Container>
      </BackgroundWrapper>
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Layout;

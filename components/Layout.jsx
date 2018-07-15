import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import colors from '../shared/colors';
import OpenSansRegular from '../static/fonts/Open_Sans/OpenSans-Regular.ttf';
import OpenSansBold from '../static/fonts/Open_Sans/OpenSans-Bold.ttf';
import PoppinsRegular from '../static/fonts/Poppins/Poppins-Regular.ttf';

import { BackgroundWrapper, ViewWrapper } from './Wrappers';

import Display from './Display';
import Navigation from './Navigation';

injectGlobal`
   ${styledNormalize}
   
    @font-face {
        font-family: OpenSansRegular;
        src: url('${OpenSansRegular}') format('truetype');
    }
    
    @font-face {
        font-family: OpenSansBold;
        src: url('${OpenSansBold}') format('truetype');
    }
    
    @font-face {
        font-family: PoppinsRegular;
        src: url('${PoppinsRegular}') format('truetype');
    }
 
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }
   
    body {
        font-family: OpenSansRegular, sans-serif;
        font-size: 16px;
        line-height: 26px;
    }

    
    h1 {
       font-family: PoppinsRegular,sans-serif;
       font-size: 20px;
       line-height: 30px;
       margin: 5px auto;
    }   
    
    h2 {
       font-size: 18px
    }
`;

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
            <Col xs={12} md={6} style={{ overflow: 'visible' }}>
              <Display />
            </Col>
            <Col xs={12} md={2} style={{ overflow: 'visible' }}>
              <Navigation />
            </Col>
            <Col xs={12} md={4} style={{ overflow: 'visible' }}>
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

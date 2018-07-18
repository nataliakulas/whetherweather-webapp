import React from 'react';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import colors from '../shared/colors';
import OpenSansRegular from '../static/fonts/Open_Sans/OpenSans-Regular.ttf';
import PoppinsRegular from '../static/fonts/Poppins/Poppins-Regular.ttf';

import { BackgroundWrapper, ViewWrapper } from './Styles';

import Display from './Display';
import Navigation from './Navigation';
import theme from '../shared/theme';

injectGlobal`
   ${styledNormalize}
   
    @font-face {
        font-family: OpenSansRegular;
        src: url('${OpenSansRegular}') format('truetype');
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
       text-align: center;
       margin: 5px auto;
    }   
    
    h2 {
       font-size: 16px;
       
        @media (min-width: 992px) {
            font-size: 18px;
        }
    }  
    
    p {
      font-size: 14px;
      line-height: 20px;
      margin: 10px 0;
      
      @media (min-width: 992px) {
          font-size: 16px;
          line-height: 26px;
      }     
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
        <Container style={{ width: '100%' }}>
          <ScreenClassRender render={screenClass => (
            <Row nogutter style={{ flexDirection: ['xs', 'sm', 'md'].includes(screenClass) ? 'column-reverse' : 'row' }}>
              <Col xs={12} lg={6} xl={5} offset={{ xl: 1 }} style={{ overflow: 'visible' }}>
                <Display />
              </Col>
              <Col xs={12} lg={1} style={{ overflow: 'visible' }}>
                <Navigation />
              </Col>
              <Col xs={12} lg={5} xl={4} style={{ overflow: 'visible' }}>
                <ScreenClassRender render={screenClass => (
                  <ViewWrapper
                    background={theme.primaryBlue}
                    width="420px"
                    style={{
                      borderRadius: ['lg', 'xl'].includes(screenClass) ? '0 2px 2px 0' : '2px',
                      padding: ['lg', 'xl'].includes(screenClass) ? '30px' : '0',
                      margin: ['lg', 'xl'].includes(screenClass) ? 'auto' : '15px auto 30px auto'
                    }}
                  >
                    {children}
                  </ViewWrapper>
                )}
                />
              </Col>
            </Row>
          )}
          />
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

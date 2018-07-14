import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import theme from '../shared/theme';
import OpenSansRegular from '../static/fonts/Open_Sans/OpenSans-Regular.ttf';

import Layout from '../components/Layout';

injectGlobal`
   ${styledNormalize}
   
    @font-face {
        font-family: OpenSansRegular;
        src: url('${OpenSansRegular}') format('truetype');
    }
   
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }
   
    body {
        color: ${theme.dark};
        font-family: OpenSansRegular, sans-serif;
        font-size: 16px;
        line-height: 26px;
    }
    
    ::selection {
        background-color: ${theme.dark};
        color: ${theme.light};
    }   
`;

export default function IndexPage()  {
  return (
    <Layout title='Whether Weather'>
      <Container>
        <Row>
          <Col>
          Whether Weather
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}


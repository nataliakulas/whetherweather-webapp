import React from 'react';

import {injectGlobal} from 'styled-components';
import styledNormalize from 'styled-normalize';

import Layout from '../components/Layout';

injectGlobal`
  ${styledNormalize}
 
  body {

  }
`;

export default () => <Layout>
  <p>Whether Weather</p>
</Layout>;

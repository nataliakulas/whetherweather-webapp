import React from 'react';
import Layout from '../components/Layout';
import { ColumnWrapper } from '../components/Styles';


const Index = () => (
  <Layout title='Whether Weather'>
    <ColumnWrapper>
      <h1>
        Whether Weather
      </h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Whether the weather be fine,
        <br />
        Or whether the weather be not,
        <br />
        Whether the weather be cold,
        <br />
        Or whether the weather be hot,
        <br />
        We&apos;ll weather the weather
        <br />
        Whatever the weather,
        <br />
        Whether we like it or not.
      </p>
      <p style={{fontSize: 14}}>
        ---&nbsp;anonymous&nbsp;---
      </p>
    </ColumnWrapper>
  </Layout>
);

export default Index;
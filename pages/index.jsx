import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Layout from '../components/Layout';

class Index extends  React.Component {
  static async getInitialProps({store}) {
    // store.dispatch({type: 'SOME_ASYNC_ACTION_REQUEST'});

    return {staticData: 'Active view bonded with display component'}
  }

  render() {
    const {staticData} = this.props;

    return (
      <Layout title='Whether Weather'>
        {staticData}
      </Layout>
    )
  }
}

Index.propTypes = {
  staticData: PropTypes.string.isRequired
};

export default connect(null)(Index)

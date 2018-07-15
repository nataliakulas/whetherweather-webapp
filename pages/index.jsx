import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { SET_USER_POSITION } from '../state/actions';

const mapStateToProps = (state) => ({
  weather: state.weatherState.weather
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_USER_POSITION, payload: { latitude, longitude } })
});

class Index extends  React.Component {

  componentDidMount() {
    const { onSetPosition} = this.props;
    const geolocation = window.navigator.geolocation;

    new Promise((resolve) => {
      if (!geolocation) {
        window.alert('Gelocation not supported');
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
        onSetPosition(position.coords.latitude, position.coords.longitude);
      });
    });
  }

  static async getInitialProps() {
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
  staticData: PropTypes.string.isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null,mapDispatchToProps)
)(Index)

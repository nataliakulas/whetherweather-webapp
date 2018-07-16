import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import {ColumnWrapper} from '../components/Styles';
import { SET_USER_POSITION } from '../state/actions';

const mapStateToProps = (state) => ({
  weather: state.weatherState
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_USER_POSITION, payload: { latitude, longitude } })
});

class Location extends  React.Component {

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
    return {staticData: ['Current weather.', 'Whether it\'s good or bad.']}
  }

  render() {
    const {staticData, weather} = this.props;

    const lat = weather.latitude;
    const lon = weather.longitude;

    return (
      <Layout>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
          <p>
          Your location:
          </p>
          <p>
            {lat}
          </p>
          <p>
            {lon}
          </p>
        </ColumnWrapper>
      </Layout>
    )
  }
}

Location.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  weather: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null,mapDispatchToProps)
)(Location)

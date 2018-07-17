import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { ColumnWrapper } from '../components/Styles';
import { SET_POSITION, setAction } from '../state/actions';


const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch(setAction(SET_POSITION, { latitude, longitude }))
});

class Location extends React.Component {
  componentDidMount() {
    const { onSetPosition } = this.props;
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
    return { staticData: ['Current weather.', 'Whether it\'s good or bad.'] };
  }

  render() {
    const { staticData } = this.props;

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
        </ColumnWrapper>
      </Layout>
    );
  }
}

Location.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(null, mapDispatchToProps)
)(Location);

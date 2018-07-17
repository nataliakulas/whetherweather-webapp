import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { DisplayWrapper } from './Styles';
import Box from './Box';
import Panel from './Panel';

import { FETCH_CURRENT_WEATHER_REQUEST, SET_FAV, SET_UNFAV } from '../state/actions';

const mapStateToProps = (state) => ({
  display: state.displayState,
  countries: state.countriesState.countries
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentWeather: (position) => dispatch({ type: FETCH_CURRENT_WEATHER_REQUEST, payload: position }),
  onSetFav: (latitude, longitude) => dispatch({ type: SET_FAV, payload: { latitude, longitude } }),
  onSetUnfav: (latitude, longitude) => dispatch({ type: SET_UNFAV, payload: { latitude, longitude } })
});

class Display extends React.Component {
  componentDidMount() {
    const { onFetchCurrentWeather, display } = this.props;
    onFetchCurrentWeather(display);
  }

  toggleFav = (latitude, longitude) => {
    const { favs, onSetFav, onSetUnfav } = this.props;

    if (favs.find(item => item.latitude === latitude && item.longitude === longitude)) {
      onSetUnfav(latitude, longitude);
    } else {
      onSetFav(latitude, longitude);
    }
  };

  render() {
    const { display, countries } = this.props;

    let capital = '---';
    let country = '---';
    let latitude = '---';
    let longitude = '---';

    function roundTo2(number) {
      return Math.round(number * 100) / 100;
    }

    if (display.latitude !== '---' && display.longitude !== '---') {
      latitude = roundTo2(display.latitude);
      longitude = roundTo2(display.longitude);


      if (countries.length > 0) {
        countries.forEach(item => {
          if (item.latitude === latitude && item.longitude === longitude) {
            capital = item.capital;
            country = item.country;
          }
        });
      }
    }

    return (
      <DisplayWrapper>
        <Box
          icon={display.icon}
          summary={display.summary}
          temperature={display.temperature}
          pressure={display.pressure}
          humidity={display.humidity}
          cloudCover={display.cloudCover}
          windSpeed={display.windSpeed}
          windBearing={display.windBearing}
        />
        <Panel
          capital={capital}
          country={country}
          latitude={latitude}
          longitude={longitude}
          toggleFav={this.toggleFav}
          fav
        />
      </DisplayWrapper>
    );
  }
}

Display.propTypes = {
  display: PropTypes.instanceOf(Object).isRequired,
  onFetchCurrentWeather: PropTypes.func.isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Display);
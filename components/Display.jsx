import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { DisplayWrapper } from './Styles';
import Box from './Box';
import Panel from './Panel';

import { FETCH_CURRENT_WEATHER_REQUEST, SET_FAV, SET_UNFAV, setAction } from '../state/actions';

const mapStateToProps = (state) => ({
  display: state.displayState,
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentWeather: (position) => dispatch(setAction(FETCH_CURRENT_WEATHER_REQUEST, position)),
  onSetFav: (latitude, longitude) => dispatch(setAction(SET_FAV, { latitude, longitude })),
  onSetUnfav: (latitude, longitude) => dispatch(setAction(SET_UNFAV, { latitude, longitude }))
});

class Display extends React.Component {
  componentDidMount() {
    const { onFetchCurrentWeather, display } = this.props;
    onFetchCurrentWeather(display);
  }

  toggleFav = () => {
    const { display, favs, onSetFav, onSetUnfav } = this.props;

    if (favs.find(fav => fav.latitude === display.latitude && fav.longitude === display.longitude)) {
      onSetUnfav(display.latitude, display.longitude);
    } else {
      onSetFav(display.latitude, display.longitude);
    }
  };

  render() {
    const { display, countries, favs } = this.props;

    let capital = '---';
    let country = '---';
    let latitude = '---';
    let longitude = '---';
    let isFav = false;

    if (display.latitude !== '---' && display.longitude !== '---') {
      latitude = display.latitude;
      longitude = display.longitude;

      if (countries.length > 0) {
        countries.forEach(item => {
          if (item.latitude === latitude && item.longitude === longitude) {
            capital = item.capital;
            country = item.country;
          }
        });
      }

      if (favs.length > 0) {
        favs.forEach(item => {
          if (item.latitude === latitude && item.longitude === longitude) {
            isFav = true;
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
          fav={isFav}
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
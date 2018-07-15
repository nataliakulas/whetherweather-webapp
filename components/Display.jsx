import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { DisplayWrapper } from './Wrappers';
import ViewBox from './ViewBox';

import { FETCH_CURRENT_WEATHER_REQUEST } from '../state/actions';

const mapStateToProps = (state) => ({
  weather: state.weatherState
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentWeather: (position) => dispatch({ type: FETCH_CURRENT_WEATHER_REQUEST, payload: position })
});

class Display extends React.Component {

  componentDidMount() {
    const { onFetchCurrentWeather, weather } = this.props;
    onFetchCurrentWeather(weather);
  }

  setImage = (icon) => {
    switch (icon) {
      case 'clear-day':
        return '/static/images/weather/clear-day.svg';
      case 'clear-night':
        return '/static/images/weather/clear-night.svg';
      case 'rain':
        return '/static/images/weather/rain.svg';
      case 'snow':
        return '/static/images/weather/snow.svg';
      case 'sleet':
        return '/static/images/weather/sleet.svg';
      case 'wind':
        return '/static/images/weather/wind.svg';
      case 'fog':
        return '/static/images/weather/fog.svg';
      case 'cloudy':
        return '/static/images/weather/cloudy.svg';
      case 'partly-cloudy-day':
        return '/static/images/weather/partly-cloudy-day.svg';
      case 'partly-cloudy-night':
        return '/static/images/weather/partly-cloudy-night.svg';
      default:
        return '/static/images/weather/default.svg';
    }
  };

  render() {
    const { weather } = this.props;
    let image = this.setImage(weather.icon);

    return (
      <DisplayWrapper>
        <h1>
          Current weather. Whether it&apos;s good or bad.
        </h1>
        <ViewBox
          icon={weather.icon}
          image={image}
          summary={weather.summary}
          temperature={weather.temperature}
          pressure={weather.pressure}
          humidity={weather.humidity}
          cloudCover={weather.cloudCover}
          windSpeed={weather.windSpeed}
          windBearing={weather.windBearing}
        />
      </DisplayWrapper>
    );
  }
}

Display.propTypes = {
  weather: PropTypes.instanceOf(Object).isRequired,
  onFetchCurrentWeather: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Display);
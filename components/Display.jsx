import React from 'react';
import {ScreenClassRender} from 'react-grid-system';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ViewWrapper} from './Styles';
import Box from './Box';
import Panel from './Panel';

import {FETCH_CURRENT_WEATHER_REQUEST, SET_FAV, SET_UNFAV, setAction} from '../state/actions';
import theme from '../shared/theme';

const Loader = styled.img`
    width: 200px;
    height: 200px;
    margin: 30px;
    animation: 20s dialspin infinite linear;
   
   @keyframes dialspin  {
      0% {transform: rotateZ(0deg)}
      100% { transform: rotateZ(360deg) }
}
`;

const mapStateToProps = (state) => ({
  display: state.displayState,
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentWeather: (position) => dispatch(setAction(FETCH_CURRENT_WEATHER_REQUEST, position)),
  onSetFav: (latitude, longitude) => dispatch(setAction(SET_FAV, {latitude, longitude})),
  onSetUnfav: (latitude, longitude) => dispatch(setAction(SET_UNFAV, {latitude, longitude}))
});

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
  }

  componentDidMount() {
    const {onFetchCurrentWeather, display} = this.props;
    onFetchCurrentWeather(display);
    this.setState({loading: false})
  }

  toggleFav = () => {
    const {display, favs, onSetFav, onSetUnfav} = this.props;

    if (favs.find(fav => fav.latitude === display.latitude && fav.longitude === display.longitude)) {
      onSetUnfav(display.latitude, display.longitude);
    } else {
      onSetFav(display.latitude, display.longitude);
    }
  };

  render() {
    const {display, countries, favs} = this.props;
    const {loading} = this.state;

    if (loading) {
      return (
        <ScreenClassRender render={screenClass => (
          <ViewWrapper
            background={theme.primaryBlue}
            style={{
              borderRadius: ['lg', 'xl'].includes(screenClass) ? '2px 0 0 2px' : '2px',
              padding: ['lg', 'xl'].includes(screenClass) ? '30px' : '0',
              margin: ['lg', 'xl'].includes(screenClass) ? '0 0 0 auto' : 'auto'
            }}
          >
            <Loader src="/static/images/sun.svg" alt="Loading" />
          </ViewWrapper>
        )}
        />
      )
    }

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
      <ScreenClassRender render={screenClass => (
        <ViewWrapper
          background={theme.light}
          style={{
            borderRadius: ['lg', 'xl'].includes(screenClass) ? '2px 0 0 2px' : '2px',
            padding: ['lg', 'xl'].includes(screenClass) ? '30px' : '0',
            margin: ['lg', 'xl'].includes(screenClass) ? '0 0 0 auto' : 'auto'
          }}
        >
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
        </ViewWrapper>
      )}
      />
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
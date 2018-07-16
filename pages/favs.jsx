import React from 'react';
// import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { ColumnWrapper } from '../components/Styles';
import ViewListItem from '../components/ViewListItem';
import { FETCH_COUNTRIES_REQUEST, SET_CITY_POSITION, SET_FAV, SET_UNFAV } from '../state/actions';

const mapStateToProps = (state) => ({
  weather: state.weatherState,
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCountries: () => dispatch({ type: FETCH_COUNTRIES_REQUEST }),
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_CITY_POSITION, payload: { latitude, longitude } }),
  onSetFav: (latitude, longitude) => dispatch({ type: SET_FAV, payload: { latitude, longitude } }),
  onSetUnfav: (latitude, longitude) => dispatch({ type: SET_UNFAV, payload: { latitude, longitude } })
});

class Favs extends React.Component {
  componentDidMount() {
    const { onFetchCountries } = this.props;
    onFetchCountries();
  }

  static async getInitialProps() {
    return { staticData: ['Favs,', 'list.', 'Sorry, no favs'] };
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
    const { staticData, favs, countries, weather, onSetPosition } = this.props;

    return (
      <Layout title='Whether Weather'>
        <h1>
          {staticData[0]}
          <br />
          {staticData[1]}
        </h1>
        {favs.length === 0 ? (
          <ColumnWrapper style={{ height: '75%' }}>
            <p>
              {staticData[2]}
            </p>
          </ColumnWrapper>
        ) : null}
        {favs.length > 0 && favs.map(item => {
          let capital = countries.find(country => country.latitude === item.latitude && country.longitude === item.longitude).capital;
          let country = countries.find(country => country.latitude === item.latitude && country.longitude === item.longitude).country;
          let isFav = true;
          let isActive = weather.latitude === item.latitude && weather.longitude && weather.latitude;

          return (
            <ViewListItem
              key={item.latitude + item.longitude}
              latitude={item.latitude}
              longitude={item.longitude}
              capital={capital}
              country={country}
              toggleFav={() => this.toggleFav(item.latitude, item.longitude)}
              showWeather={() => onSetPosition(item.latitude, item.longitude)}
              fav={isFav}
              active={isActive}
            />
          );
        })}
      </Layout>
    );
  }
}

Favs.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired,
  onFetchCountries: PropTypes.func.isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  weather: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Favs);

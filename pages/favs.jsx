import React from 'react';
// import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { ColumnWrapper } from '../components/Styles';
import ViewListItem from '../components/ListItem';
import { SET_FAV, SET_POSITION, SET_UNFAV, setAction } from '../state/actions';

const mapStateToProps = (state) => ({
  display: state.displayState,
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch(setAction(SET_POSITION, { latitude, longitude })),
  onSetFav: (latitude, longitude) => dispatch(setAction(SET_FAV, { latitude, longitude })),
  onSetUnfav: (latitude, longitude) => dispatch(setAction(SET_UNFAV, { latitude, longitude }))
});

class Favs extends React.Component {
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
    const { staticData, favs, countries, display, onSetPosition } = this.props;

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
        ) : (
          favs.map(fav => {

            let capital = '';
            let country = '';
            let latitude = fav.latitude;
            let longitude = fav.longitude;
            let isFav = true;
            let isActive = display.latitude === fav.latitude && display.longitude && display.latitude;

            countries && countries.forEach(item => {
              if (fav.latitude === item.latitude && fav.longitude === item.longitude) {
                capital = item.capital;
                country = item.country;
              }
            });

            return (
              <ViewListItem
                key={latitude + longitude}
                latitude={latitude}
                longitude={longitude}
                position={[capital, country]}
                toggleFav={() => this.toggleFav(latitude, longitude)}
                showWeather={() => onSetPosition(latitude, longitude)}
                fav={isFav}
                active={isActive}
              />
            );
          })
        )}
      </Layout>
    );
  }
}


Favs.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  display: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Favs);

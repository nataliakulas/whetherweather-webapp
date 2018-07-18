import React from 'react';
// import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { ColumnWrapper, ListWrapper, Input } from '../components/Styles';
import ListItem from '../components/ListItem';
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
  constructor(props) {
    super(props);
    this.state = { result: '' };
  }

  static async getInitialProps() {
    return { staticData: ['Best-loved, probably', 'whatever the weather.', 'Sorry, no favs'] };
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
    const { result } = this.state;

    return (
      <Layout title='Whether Weather'>
        <h1>
          {staticData[0]}
          <br />
          {staticData[1]}
        </h1>
        <Input
          type='search'
          value={result}
          placeholder='Search for fav'
          disabled={favs.length === 0}
          onChange={e => this.setState({ result: e.target.value.substr(0, 20) })}
        />
        {favs.length === 0 ? (
          <ColumnWrapper style={{ height: '75%' }}>
            <p style={{fontWeight: 'bold'}}>
              {staticData[2]}
            </p>
          </ColumnWrapper>
        ) : (
          <ListWrapper>
            {favs.map(fav => {

              let capital = 'My';
              let country = 'location';
              let latitude = fav.latitude;
              let longitude = fav.longitude;
              let isFav = true;
              let isActive = display.latitude === fav.latitude && display.longitude === fav.longitude;

              countries && countries.forEach(item => {
                if (fav.latitude === item.latitude && fav.longitude === item.longitude) {
                  capital = item.capital;
                  country = item.country;
                }
              });

              if ((capital.toLowerCase().indexOf(result.toLowerCase()) !== -1) || (country.toLowerCase().indexOf(result.toLowerCase()) !== -1)) {
                return (
                  <ListItem
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
              }
            })}
          </ListWrapper>
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

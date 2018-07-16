import React from 'react';
// import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import ViewListItem from '../components/ViewListItem';
import { ColumnWrapper } from '../components/Styles';
import { SET_FAV, SET_UNFAV } from '../state/actions';

const mapStateToProps = (state) => ({
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onSetFav: (latitude, longitude) => dispatch({ type: SET_FAV, payload: { latitude, longitude } }),
  onSetUnfav: (latitude, longitude) => dispatch({ type: SET_UNFAV, payload: { latitude, longitude } })
});

class Favs extends React.Component {
  componentDidMount() {
    const { onSetFav, onSetUnfav } = this.props;

    console.log(onSetFav, onSetUnfav);
  }

  static async getInitialProps() {
    return { staticData: ['Favs,', 'list.'] };
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
    const { staticData, favs, countries } = this.props;

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
          {favs.map(item => {
            let capital = countries.find(country => country.latitude === item.latitude && country.longitude === item.longitude).capital;
            let country = countries.find(country => country.latitude === item.latitude && country.longitude === item.longitude).country;

            return (
              <ViewListItem
                key={item.latitude + item.longitude}
                latitude={item.latitude}
                longitude={item.longitude}
                capital={capital}
                country={country}
                toggleFav={() => this.toggleFav(item.latitude, item.longitude)}
                onClick={() => console.log('fetch weather')}
              />
            );
          })}
        </ColumnWrapper>
      </Layout>
    );
  }
}

Favs.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Favs);

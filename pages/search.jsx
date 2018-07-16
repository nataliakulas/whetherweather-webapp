import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import { ColumnWrapper, RowBetweenWrapper, SelectWrapper, Button, PanelWrapper, Image, SquareButton } from '../components/Styles';
import { SET_CITY_POSITION, FETCH_COUNTRIES_REQUEST, SET_FAV, SET_UNFAV } from '../state/actions';

const mapStateToProps = (state) => ({
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCountries: () => dispatch({ type: FETCH_COUNTRIES_REQUEST }),
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_CITY_POSITION, payload: { latitude, longitude } }),
  onSetFav: (latitude, longitude) => dispatch({ type: SET_FAV, payload: { latitude, longitude } }),
  onSetUnfav: (latitude, longitude) => dispatch({ type: SET_UNFAV, payload: { latitude, longitude } })
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      capital: '',
      country: '',
      latitude: '',
      longitude: '',
      flag: '/static/images/default.svg',
      fav: false
    };
  }

  componentDidMount() {
    const { onFetchCountries } = this.props;
    onFetchCountries();
  }

  static async getInitialProps() {
    return { staticData: ['Check whether the weather,', 'is fine somewhere else.'] };
  }

  handleChange = (selected) => {
    this.setState({ selected });
  };

  handleSearch = () => {
    const { selected } = this.state;

    if (selected) {
      const { onSetPosition, countries, favs } = this.props;

      countries.map(country => {
        if (country.capital === selected.label) {
          onSetPosition(country.latitude, country.longitude);

          this.setState({
            capital: country.capital,
            country: country.country,
            latitude: country.latitude,
            longitude: country.longitude,
            flag: '/static/images/flags/' + country.country.toLowerCase() + '.svg',
            fav: favs.find(item => item.latitude === country.latitude && item.longitude === country.longitude)
          });
        }
      });
    }
  };

  toggleFav = () => {
    const { latitude, longitude, fav } = this.state;
    const { favs, onSetFav, onSetUnfav } = this.props;

    if (fav && favs.find(item => item.latitude === latitude && item.longitude === longitude)) {
      onSetUnfav(latitude, longitude);
      this.setState({ fav: false });
    } else {
      onSetFav(latitude, longitude);
      this.setState({ fav: true });
    }
  };

  render() {
    const { staticData, countries } = this.props;
    const { selected, capital, country, latitude, longitude, flag, fav } = this.state;

    const options = [];

    countries.forEach(country => {
      options.push({ value: country.capital, label: country.capital });
    });


    const sortAscending = () => {
      console.log('sort A to Z');
    };

    const sortDescending = () => {
      console.log('sort Z to A');
    };

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
          <ColumnWrapper style={{ width: '100%' }}>
            <Row style={{ width: '100%', maxWidth: 305 }}>
              <Col xs={12} sm={6}>
                <Button onClick={sortAscending} disabled={!options} type="button">
                  From A to Z
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button onClick={sortDescending} disabled={!options} type="button">
                  From Z to A
                </Button>
              </Col>
            </Row>
            <SelectWrapper>
              <Select
                disabled={!options}
                placeholder="Search for city"
                name="select"
                value={selected}
                onChange={this.handleChange}
                options={options}
              />
            </SelectWrapper>
            <Button onClick={this.handleSearch} disabled={!options} type="button" chunk>
              Check IT!
            </Button>
          </ColumnWrapper>
          <PanelWrapper>
            {capital.length > 0 ? (
              <Row>
                <Col xs={12} xl={7}>
                  <p style={{ fontWeight: 'bold', marginTop: 30 }}>
                    {capital}
                    &nbsp;in&nbsp;
                    {country}
                  </p>
                  <RowBetweenWrapper>
                    <p>
                      Coordinates:&nbsp;
                      <br />
                      {latitude}
                      ,&nbsp;
                      {longitude}
                    </p>
                    <SquareButton onClick={this.toggleFav} disabled={!capital} type="button" active={fav} />
                  </RowBetweenWrapper>
                </Col>
                <Col xs={12} xl={5}>
                  <Image src={flag} alt={country} />
                </Col>
              </Row>
            ) : <div style={{ height: 166 }} />
            }
          </PanelWrapper>
        </ColumnWrapper>
      </Layout>
    );
  }
}

Search.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired,
  onFetchCountries: PropTypes.func.isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Search);

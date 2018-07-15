import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import { ColumnWrapper, SelectWrapper, Button, PanelWrapper, Image } from '../components/Styles';
import { SET_CITY_POSITION, FETCH_COUNTRIES_REQUEST } from '../state/actions';

const mapStateToProps = (state) => ({
  countries: state.countriesState.countries
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCountries: () => dispatch({ type: FETCH_COUNTRIES_REQUEST }),
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_CITY_POSITION, payload: { latitude, longitude } })
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
      flag: '/static/images/default.svg'
    };
  }

  componentDidMount() {
    const { onFetchCountries } = this.props;
    onFetchCountries();
  }

  static async getInitialProps() {
    return { staticData: ['Check whether the weather,', 'be fine somewhere else.'] };
  }

  handleChange = (selected) => {
    this.setState({ selected });
  };

  handleSearch = () => {
    const { selected } = this.state;

    if (selected) {
      const { onSetPosition, countries } = this.props;

      countries.map(country => {
        if (country.capital === selected.label) {
          onSetPosition(country.latitude, country.longitude);

          this.setState({
            capital: country.capital,
            country: country.country,
            latitude: country.latitude,
            longitude: country.longitude,
            flag: '/static/images/flags/' + country.country.toLowerCase() + '.svg'
          });
        }
      });
    }
  };

  render() {
    const { staticData, countries } = this.props;
    const { selected, capital, country, latitude, longitude, flag } = this.state;

    const options = [];

    countries.forEach(country => {
      options.push({ value: country.capital, label: country.capital });
    });

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
          <ColumnWrapper style={{ width: '100%' }}>
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
            <Button onClick={this.handleSearch} disabled={!options}>
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
                  <p>
                    Coordinates:&nbsp;
                    <br />
                    {latitude}
                    ,&nbsp;
                    {longitude}
                  </p>
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
  onFetchCountries: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Search);

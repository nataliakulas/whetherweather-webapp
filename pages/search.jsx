import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import { ColumnWrapper, SelectWrapper, Button, PanelWrapper } from '../components/Styles';
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
      longitude: ''
    };
  }

  componentDidMount() {
    const { onFetchCountries } = this.props;
    onFetchCountries();
  }

  static async getInitialProps() {
    return { staticData: ['Check the weather.', 'Somewhere else.'] };
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
            longitude: country.longitude
          });
        }
      });
    }
  };

  render() {
    const { staticData, countries } = this.props;
    const { selected, capital, country, latitude, longitude } = this.state;

    const options = [];

    countries.forEach(country => {
      options.push({ value: country.capital, label: country.capital });
    });

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
          </h1>
          <h2>
            {staticData[1]}
          </h2>
          <PanelWrapper>
            <ColumnWrapper>
              {capital.length > 0 ? (
                <div>
                  <p>
                    {capital}
                  </p>
                  <p>
                    {country}
                  </p>
                  <p>
                    {latitude}
                  </p>
                  <p>
                    {longitude}
                  </p>
                </div>
              ) : (
                <p>
                  Select city
                </p>
              )}
            </ColumnWrapper>
          </PanelWrapper>
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

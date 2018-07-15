import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import { ColumnWrapper, SelectWrapper, Button } from '../components/Styles';
import { SET_CITY_POSITION } from '../state/actions';

const countries = require('capitals-coordinates').eu28();

const mapStateToProps = (state) => ({
  weather: state.weatherState
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_CITY_POSITION, payload: { latitude, longitude } })
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  static async getInitialProps() {
    return { staticData: ['Check the weather.', 'Somewhere else.'] };
  }

  handleChange = (selected) => {
    this.setState({ selected });
    if (selected) {
      const { onSetPosition } = this.props;

      countries.map(country => {
        if (country.properties.capital === selected.label) {
          const coordinates = country.geometry.coordinates;

          onSetPosition(coordinates[0], coordinates[1]);
        }
      });
    }
  };

  render() {
    const { staticData } = this.props;
    const { selected } = this.state;

    const options = [];
    countries.map(country => {
        options.push({ value: country.properties.capital, label: country.properties.capital });
      }
    );

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
          </h1>
          <h2>
            {staticData[1]}
          </h2>
          <SelectWrapper>
            <Select
              disabled={options.length === 0}
              placeholder="Search for city"
              name="select"
              value={selected}
              onChange={this.handleChange}
              options={options}
            />
          </SelectWrapper>
          <Button>
            Check IT!
          </Button>
        </ColumnWrapper>
      </Layout>
    );
  }
}

Search.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Search);

import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import { ColumnWrapper, SelectWrapper, Button } from '../components/Styles';
import { SET_POSITION, setAction } from '../state/actions';

const mapStateToProps = (state) => ({
  countries: state.countriesState.countries,
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch(setAction(SET_POSITION, { latitude, longitude }))
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  static async getInitialProps() {
    return { staticData: ['Whether the weather,', 'is fine somewhere else?'] };
  }

  handleChange = (selected) => {
    this.setState({ selected });
  };

  handleSearch = () => {
    const { selected } = this.state;

    if (selected) {
      const { onSetPosition, countries } = this.props;

      countries.map(country => {
        if (country.capital === selected.value) {
          onSetPosition(country.latitude, country.longitude);
        }
      });
    }
  };

  render() {
    const { staticData, countries } = this.props;
    const { selected } = this.state;

    const options = [];

    countries.forEach(country => {
      options.push({ value: [country.capital, country.country], label: country.capital + ', ' + country.country });
    });

    const sort = (type, method) => {
      options.sort((a, b) => {
        let el = type === 'capitals' ? 0 : 1;

        if (method === 'ascending') {
          return a.value[el].localeCompare(b.value[el]);
        } else {
          return b.value[el].localeCompare(a.value[el]);
        }
      });
    };

    return (
      <Layout title='Whether Weather'>
        <h1>
          {staticData[0]}
          <br />
          {staticData[1]}
        </h1>
        <ColumnWrapper style={{ height: 'calc(100% - 70px)' }}>
          <Row style={{ width: '100%', maxWidth: 305 }}>
            <Col xs={12} sm={6}>
              <Button onClick={() => sort('capitals', 'ascending')} disabled={!options} type="button">
                Capitals A to Z
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button onClick={() => sort('capitals', 'descending')} disabled={!options} type="button">
                Capitals Z to A
              </Button>
            </Col>
          </Row>
          <Row style={{ width: '100%', maxWidth: 305 }}>
            <Col xs={12} sm={6}>
              <Button onClick={() => sort('countries', 'ascending')} disabled={!options} type="button">
                Countries A to Z
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button onClick={() => sort('countries', 'descending')} disabled={!options} type="button">
                Countries Z to A
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
      </Layout>
    );
  }
}

Search.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Search);

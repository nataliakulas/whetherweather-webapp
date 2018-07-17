import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import InputRadio from '../components/InputRadio';
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
      selected: '',
      options: '',
      items: 'countries',
      sorted: 'ascending'
    };
  }

  componentDidMount() {
    const { countries } = this.props;
    const options = [];

    countries && countries.forEach(country => {
      options.push({ value: [country.capital, country.country], label: country.capital + ', ' + country.country });
    });

    this.setState({ options: options });
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
      let capital = selected.value[0];

      countries.map(country => {
        if (country.capital === capital) {
          onSetPosition(country.latitude, country.longitude);
        }
      });
    }
  };


  render() {
    const { staticData } = this.props;
    const { selected, options, items, sorted } = this.state;

    const sort = (type, method) => {
      options.sort((a, b) => {
        let el = type === 'capitals' ? 0 : 1;

        if (method === 'ascending') {
          // console.log(method);
          return a.value[el].localeCompare(b.value[el]);
        } else {
          // console.log(method);
          return b.value[el].localeCompare(a.value[el]);
        }
      });

      this.setState({ items: type, sorted: method });
    };

    return (
      <Layout title='Whether Weather'>
        <h1>
          {staticData[0]}
          <br />
          {staticData[1]}
        </h1>
        <ColumnWrapper style={{ height: 'calc(100% - 100px)' }}>
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
          <Row style={{ width: '100%', maxWidth: 305 }}>
            <Col xs={12}>
              <InputRadio
                name="countriesAtoZ"
                checked={items === 'countries' && sorted === 'ascending'}
                onChange={() => sort('countries', 'ascending')}
              >
                Countries A to Z
              </InputRadio>
            </Col>
            <Col xs={12}>
              <InputRadio
                name="countriesZtoA"
                checked={items === 'countries' && sorted === 'descending'}
                onChange={() => sort('countries', 'descending')}
              >
                Countries Z to A
              </InputRadio>
            </Col>
            <Col xs={12}>
              <InputRadio
                name="capitalsAtoZ"
                checked={items === 'capitals' && sorted === 'ascending'}
                onChange={() => sort('capitals', 'ascending')}
              >
                Capitals A to Z
              </InputRadio>
            </Col>
            <Col xs={12}>
              <InputRadio
                name="capitalsZtoA"
                checked={items === 'capitals' && sorted === 'descending'}
                onChange={() => sort('capitals', 'descending')}
              >
                Capitals Z to A
              </InputRadio>
            </Col>
          </Row>
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

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from 'recompose';
import Select from 'react-select';

import Layout from '../components/Layout';
import {ColumnWrapper, SelectWrapper, Button} from '../components/Styles';
import { SET_CITY_POSITION } from '../state/actions';


const mapStateToProps = (state) => ({
  weather: state.weatherState
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosition: (latitude, longitude) => dispatch({ type: SET_CITY_POSITION, payload: { latitude, longitude } })
});

class Search extends  React.Component {
constructor(props) {
  super(props);
  this.state={
    loading: true,
    selected:''
  }
}

  componentDidMount() {
  const{loading}=this.state;

  console.log(loading);
    const { onSetPosition} = this.props;
        onSetPosition(52.237049, 21.017532);

  }

  static async getInitialProps() {
    return {staticData: ['Check the weather.', 'Somewhere else.']}
  }

  handleChange = (selected) => {
    this.setState({ selected });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selected) {
      console.log(`Selected: ${selected.label}`);
    }
  };

  render() {
    const {staticData} = this.props;
    const {selected}=this.state;
    //
    // const lat = weather.latitude;
    // const lon = weather.longitude;

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
          </h1>
          <h2>
            {staticData[1]}
          </h2>
          <p>
            {/*{lat}*/}
          </p>
          <p>
            {/*{lon}*/}
          </p>
          <SelectWrapper>
            <Select
              placeholder="Search for city"
              name="select"
              value={selected}
              onChange={this.handleChange}
              options={[
            {value:'one', label: 'Odjnge'},
            {value:'two', label: 'Tqwyo'}
          ]}
            />
          </SelectWrapper>
          <Button>
            Check IT!
          </Button>
        </ColumnWrapper>
      </Layout>
    )
  }
}

Search.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  // weather: PropTypes.instanceOf(Object).isRequired,
  onSetPosition: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null,mapDispatchToProps)
)(Search)

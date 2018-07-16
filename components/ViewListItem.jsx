import React from 'react';
import PropTypes from 'prop-types';

import { SquareButton } from './Styles';

class ViewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { latitude, longitude, capital, country, toggleFav, onClick } = this.props;
    const { loading } = this.state;

    console.log(latitude, longitude, capital, country);

    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <div>
        <div role="button" tabIndex={0} onClick={onClick} onKeyPress={onClick}>
          <p>
            {capital? capital: null}
          </p>
          <p>
            {country? country: null}
          </p>
          <p>
            {longitude}
          </p>
          <p>
            {latitude}
          </p>
        </div>
        <SquareButton onClick={toggleFav} disabled={!latitude || !longitude} type="button" />
      </div>
    );
  }
}

ViewListItem.propTypes = {
  capital: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  toggleFav: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ViewListItem;
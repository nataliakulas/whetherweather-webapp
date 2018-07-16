import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../shared/theme';

import { SquareButton, Button } from './Styles';

const ViewListItemWrapper = styled.div`
    margin: 10px auto;
    background-color: ${theme.light};
    border: 1px solid;
    border-color: ${({ active }) => active ? theme.tertiaryBlue : theme.light};
    border-radius: 2px;
`;

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
    const { latitude, longitude, capital, country, toggleFav, showWeather, active } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <ViewListItemWrapper active={active}>
        <Row style={{ width: '100%', alignItems: 'center' }}>
          <Col xs={12} xl={2}>
            <SquareButton onClick={toggleFav} disabled={!latitude || !longitude} type="button" />
          </Col>
          <Col xs={12} xl={6}>
            <p style={{ fontSize: 14, margin: '0 5px' }}>
              {capital ? capital : null}
              ,&nbsp;
              {country ? country : null}
              <br />
              {longitude}
              ,&nbsp;
              {latitude}
            </p>
          </Col>
          <Col xs={12} xl={4}>
            <Button onClick={showWeather} type='button'>
              Weather
            </Button>
          </Col>
        </Row>
      </ViewListItemWrapper>
    );
  }
}

ViewListItem.propTypes = {
  capital: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  toggleFav: PropTypes.func.isRequired,
  showWeather: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default ViewListItem;
import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../shared/theme';

import { SquareButton, Button } from './Styles';

const ListItemWrapper = styled.div`
    margin: 10px auto;
    background-color: ${({ active }) => active ? theme.light : theme.primaryBlue };
    border: 1px solid;
    border-color: ${({ active }) => active ? theme.light : theme.secondaryBlue };
    border-radius: 2px;
    padding: 0 10px;
`;

class ListItem extends React.Component {
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
    const { latitude, longitude, position, toggleFav, showWeather, active, fav } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <ListItemWrapper active={active}>
        <Row style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }} nogutter>
          <Col xs={12} xl={2}>
            <SquareButton onClick={toggleFav} disabled={!latitude || !longitude} type="button" active={fav} style={{ marginLeft: 0 }} />
          </Col>
          <Col xs={12} xl={8}>
            <p style={{ fontSize: 14, margin: '0 10px' }}>
              {position[0]}
              {position[1] === 'location' ? ' ' : ', '}
              {position[1]}
              <br />
              {latitude}
              ,&nbsp;
              {longitude}
            </p>
          </Col>
          <Col xs={12} xl={2}>
            <Button onClick={showWeather} type='button' style={{fontSize: 12}}>
              Check
            </Button>
          </Col>
        </Row>
      </ListItemWrapper>
    );
  }
}

ListItem.defaultProps = {
  position: []
};

ListItem.propTypes = {
  position: PropTypes.instanceOf(Array),
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  toggleFav: PropTypes.func.isRequired,
  showWeather: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  fav: PropTypes.bool.isRequired
};

export default ListItem;
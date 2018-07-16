import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image, BoxWrapper } from './Styles';

const WindIcon = styled.div`
    width: 30px;
    height: 30px;
    background-image: url("/static/images/weather/arrow.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30px;
    transform: rotateZ(${({ degree }) => degree ? degree : 0}deg);
    margin: 0 10px;
`;

class Box extends React.Component {
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
    const { icon, summary, temperature, pressure, humidity, cloudCover, windSpeed, windBearing } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    function roundTo1(number) {
      return Math.round(number * 10) / 10;
    }

    return (
      <BoxWrapper>
        <Row>
          <Col xs={12} xl={4} offset={{ xl: 1 }}>
            <Image
              src={
                icon === '---' ?
                  ('/static/images/default.svg') :
                  ('/static/images/weather/' + icon + '.svg')
              }
              alt={icon}
            />
          </Col>
          <Col xs={12} xl={6}>
            <h2>
              {summary}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={5} offset={{ xl: 1 }}>
            <p>
              Temperature:&nbsp;
              {isNaN(roundTo1(temperature)) ? '---' : roundTo1(temperature)}
              &deg;C
            </p>
          </Col>
          <Col xs={12} xl={5}>
            <p>
              Pressure:&nbsp;
              {isNaN(roundTo1(pressure)) ? '---' : roundTo1(pressure)}
              &nbsp;hPa
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={5} offset={{ xl: 1 }}>
            <p>
              Humidity:&nbsp;
              {isNaN(roundTo1(humidity)) ? '---' : roundTo1(humidity) * 100}
              &nbsp;%
            </p>
          </Col>
          <Col xs={12} xl={5}>
            <p>
              Cloud coverage:&nbsp;
              {isNaN(roundTo1(cloudCover)) ? '---' : roundTo1(cloudCover) * 100}
              &nbsp;%
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={6} offset={{ xl: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
            <p>
              Wind:&nbsp;
              {isNaN(roundTo1(windSpeed)) ? '---' : roundTo1(windSpeed)}
              &nbsp;km/h
            </p>
            <WindIcon degree={windBearing} />
          </Col>
        </Row>
      </BoxWrapper>
    );
  }
}

Box.propTypes = {
  icon: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  temperature: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pressure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  humidity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cloudCover: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  windSpeed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  windBearing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Box;
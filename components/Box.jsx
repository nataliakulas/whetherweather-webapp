import React from 'react';
import {Row, Col} from 'react-grid-system';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {Image, BoxWrapper} from './Styles';

const WindIcon = styled.div`
    width: 30px;
    height: 30px;
    background-image: url("/static/images/weather/arrow.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30px;
    transform: rotateZ(${({degree}) => degree ? degree : 0}deg);
    margin: 0 10px;    
`;

const Box = ({icon, summary, temperature, pressure, humidity, cloudCover, windSpeed, windBearing}) => {
  function roundTo1(number) {
    return Math.round(number * 10) / 10;
  }

  return (
    <BoxWrapper>
      <Row>
        <Col xs={4} md={3} lg={5} offset={{xs: 1, md: 2, lg: 0}}>
          <Image
            src={
              icon === '---' ?
                ('/static/images/default.svg') :
                ('/static/images/weather/' + icon + '.svg')
            }
            alt={icon}
          />
        </Col>
        <Col xs={6}>
          <h2>
            {summary}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={8} lg={6} offset={{xs: 2, lg: 0}}>
          <p>
            Temperature:&nbsp;
            {isNaN(roundTo1(temperature)) ? '---' : roundTo1(temperature)}
            &deg;C
          </p>
        </Col>
        <Col xs={8} lg={6} offset={{xs: 2, lg: 0}}>
          <p>
            Pressure:&nbsp;
            {isNaN(roundTo1(pressure)) ? '---' : roundTo1(pressure)}
            &nbsp;hPa
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={8} lg={6} offset={{xs: 2, lg: 0}}>
          <p>
            Humidity:&nbsp;
            {isNaN(roundTo1(humidity)) ? '---' : roundTo1(humidity) * 100}
            &nbsp;%
          </p>
        </Col>
        <Col xs={8} lg={6} offset={{xs: 2, lg: 0}}>
          <p>
            Cloudiness:&nbsp;
            {isNaN(roundTo1(cloudCover)) ? '---' : roundTo1(cloudCover) * 100}
            &nbsp;%
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={10} lg={12} offset={{xs: 2, lg: 0}} style={{display: 'flex', alignItems: 'center'}}>
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
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ColumnWrapper, RowAroundWrapper} from './Wrappers';

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: 25px;
`;

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

class ViewBox extends React.Component {
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
    const { icon, image, summary, temperature, pressure, humidity, cloudCover, windSpeed, windBearing } = this.props;
    const { loading} = this.state;

    if (loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <ColumnWrapper>
        <Image src={image} alt={icon} />
        <h2>
          {summary}
        </h2>
        <p>
          Temperature:&nbsp;
          {temperature}
          &deg;C
        </p>
        <p>
          Pressure:&nbsp;
          {pressure}
          &nbsp;Pa
        </p>
        <p>
          Humidity:&nbsp;
          {humidity}
          &nbsp;%
        </p>
        <p>
          Cloud coverage:&nbsp;
          {cloudCover}
          &nbsp;%
        </p>
        <RowAroundWrapper>
          <p>
          Wind:&nbsp;
            {windSpeed}
          &nbsp;km/h
          </p>
          <WindIcon degree={windBearing} />
        </RowAroundWrapper>
      </ColumnWrapper>
    );
  }
}

ViewBox.propTypes = {
  icon: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  cloudCover: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windBearing: PropTypes.number.isRequired
};

export default ViewBox;
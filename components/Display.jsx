import React from 'react';

import { DisplayWrapper } from './Wrappers';
import ViewBox from './ViewBox';

import getCurrentWeather from '../shared/api';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 52.237049,
      longitude: 21.017532,
      icon: '',
      image: '/static/images/weather/default.svg',
      summary: '',
      temperature: 0,
      pressure: 0,
      humidity: 0,
      cloudCover: 0,
      windSpeed: 0,
      windBearing: 0
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.state;
    const geolocation = window.navigator.geolocation;

    new Promise((resolve) => {
      if (!geolocation) {
        window.alert('Gelocation not supported');
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        this.fetchCurrentWeather(position.coords.latitude, position.coords.longitude);
      }, () => {
        this.fetchCurrentWeather(latitude, longitude);
      });
    });
  }

  setImage = (icon) => {
    switch (icon) {
      case 'clear-day':
        this.setState({ image: '/static/images/weather/clear-day.svg' });
        break;
      case 'clear-night':
        this.setState({ image: '/static/images/weather/clear-night.svg' });
        break;
      case 'rain':
        this.setState({ image: '/static/images/weather/rain.svg' });
        break;
      case 'snow':
        this.setState({ image: '/static/images/weather/snow.svg' });
        break;
      case 'sleet':
        this.setState({ image: '/static/images/weather/sleet.svg' });
        break;
      case 'wind':
        this.setState({ image: '/static/images/weather/wind.svg' });
        break;
      case 'fog':
        this.setState({ image: '/static/images/weather/fog.svg' });
        break;
      case 'cloudy':
        this.setState({ image: '/static/images/weather/cloudy.svg' });
        break;
      case 'partly-cloudy-day':
        this.setState({ image: '/static/images/weather/partly-cloudy-day.svg' });
        break;
      case 'partly-cloudy-night':
        this.setState({ image: '/static/images/weather/partly-cloudy-night.svg' });
        break;
      default:
        this.setState({ image: '/static/images/weather/default.svg' });
    }
  };

  fetchCurrentWeather = (latitude, longitude) => {
    // console.log(latitude, longitude);

    fetch(getCurrentWeather(latitude, longitude))
      .then((response) => response.json())
      .then(response => {
        this.setImage(response.currently.icon);
        this.setState({
          icon: response.currently.icon,
          summary: response.currently.summary,
          temperature: Math.round(response.currently.temperature),
          pressure: Math.round(response.currently.pressure),
          humidity: response.currently.humidity * 100,
          cloudCover: response.currently.cloudCover * 100,
          windSpeed: this.mpsToKph(response.currently.windSpeed),
          windBearing: response.currently.windBearing
        });
      });
  };

  mpsToKph(mps) {
    return Math.round(mps * 3.6);
  }

  render() {
    const { icon, image, summary, temperature, pressure, humidity, cloudCover, windSpeed, windBearing } = this.state;

    return (
      <DisplayWrapper>
        <h1>
          Current weather. Whether it&apos;s good or bad.
        </h1>
        <ViewBox
          icon={icon}
          image={image}
          summary={summary}
          temperature={temperature}
          pressure={pressure}
          humidity={humidity}
          cloudCover={cloudCover}
          windSpeed={windSpeed}
          windBearing={windBearing}
        />
      </DisplayWrapper>
    );
  }
}

export default Display;
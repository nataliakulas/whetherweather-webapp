import React from 'react';
import { DisplayWrapper } from './Wrappers';

import getCurrentWeather  from '../shared/api';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 52.237049,
      longitude: 21.017532
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


  fetchCurrentWeather =(latitude, longitude)=>{
    console.log(latitude, longitude);

    fetch(getCurrentWeather(latitude, longitude))
      .then((response) => response.json())
      .then(response => {
        console.log(response);
      });
  };

  render() {
    const { latitude, longitude } = this.state;

    return (
      <DisplayWrapper>
        Current position
        {latitude}
        {longitude}
      </DisplayWrapper>
    );
  }
}

export default Display;
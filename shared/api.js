const API_KEY = process.env.REACT_API_KEY;

export default (latitude, longitude) =>
  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`;
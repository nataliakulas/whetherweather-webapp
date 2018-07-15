import { combineReducers } from 'redux';
import { FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_FAIL, SET_USER_POSITION, FETCH_CURRENT_WEATHER_REQUEST } from './actions';

const INITIAL_STATE = {
  latitude: 52.237049,
  longitude: 21.017532,
  icon: '',
  summary: '',
  temperature: 0,
  pressure: 0,
  humidity: 0,
  cloudCover: 0,
  windSpeed: 0,
  windBearing: 0
};

function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_POSITION: {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    }
    case FETCH_CURRENT_WEATHER_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_CURRENT_WEATHER_SUCCESS: {
      return {
        ...state,
        icon: action.payload.currently.icon,
        summary: action.payload.currently.summary,
        temperature: action.payload.currently.temperature,
        pressure: action.payload.currently.pressure,
        humidity: action.payload.currently.humidity,
        cloudCover: action.payload.currently.cloudCover,
        windSpeed: action.payload.currently.windSpeed,
        windBearing: action.payload.currently.windBearing
      };
    }
    case FETCH_CURRENT_WEATHER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  weatherState: weatherReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import {
  FETCH_CURRENT_WEATHER_SUCCESS,
  FETCH_CURRENT_WEATHER_FAIL,
  SET_POSITION,
  FETCH_CURRENT_WEATHER_REQUEST,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
  SET_FAV,
  SET_UNFAV
} from './actions';

const INITIAL_DISPLAY_STATE = {
  latitude: '---',
  longitude: '---',
  icon: '---',
  summary: '---',
  temperature: '---',
  pressure: '---',
  humidity: '---',
  cloudCover: '---',
  windSpeed: '---',
  windBearing: '---',
  active: false
};

const INITIAL_COUNTRIES_STATE = {
  countries: []
};

const INITIAL_FAVS_STATE = {
  favs: []
};

function displayReducer(state = INITIAL_DISPLAY_STATE, action) {
  switch (action.type) {
    case SET_POSITION: {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };
    }
    case FETCH_CURRENT_WEATHER_REQUEST: {
      return {
        ...state
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

function countriesReducer(state = INITIAL_COUNTRIES_STATE, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST: {
      return {
        ...state
      };
    }
    case FETCH_COUNTRIES_SUCCESS: {
      const countries = [];

      action.payload.forEach(country => {
        countries.push(
          {
            latitude: country.geometry.coordinates[0],
            longitude: country.geometry.coordinates[1],
            capital: country.properties.capital,
            country: country.properties.country
          })
        ;
      });

      return {
        ...state,
        countries: countries
      };
    }
    case FETCH_COUNTRIES_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

function favsReducer(state = INITIAL_FAVS_STATE, action) {
  switch (action.type) {
    case SET_FAV: {
      return {
        ...state,
        favs: [...state.favs,
          {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude
          }
        ]
      };
    }
    case SET_UNFAV: {
      let latitude = action.payload.latitude;
      let longitude = action.payload.longitude;
      let favs = state.favs;
      let index = favs.findIndex(item => item.latitude === latitude && item.longitude === longitude);

      if (index > -1) {
        favs.splice(index, 1);
      }

      return {
        ...state,
        favs: favs
      };
    }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  displayState: displayReducer,
  countriesState: countriesReducer,
  favsState: favsReducer
});

export default rootReducer;
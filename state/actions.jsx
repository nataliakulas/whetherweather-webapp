export const SET_POSITION = 'SET_POSITION';

export const FETCH_CURRENT_WEATHER_REQUEST = 'FETCH_CURRENT_WEATHER_REQUEST';
export const FETCH_CURRENT_WEATHER_SUCCESS = 'FETCH_CURRENT_WEATHER_SUCCESS';
export const FETCH_CURRENT_WEATHER_FAIL = 'FETCH_CURRENT_WEATHER_FAIL';

export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'FETCH_COUNTRIES_FAIL';

export const SET_FAV = 'SET_FAV';
export const SET_UNFAV = 'SET_UNFAV';

export function setAction(type, payload) {
  return {
    type: type,
    payload: payload
  };
}
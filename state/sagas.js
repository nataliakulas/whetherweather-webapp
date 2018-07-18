import { all, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
  FETCH_CURRENT_WEATHER_FAIL,
  FETCH_CURRENT_WEATHER_SUCCESS,
  SET_POSITION
} from './actions';
import getCurrentWeather from '../shared/api';

const countries = require('capitals-coordinates').eu28();

function* fetchCurrentWeatherSaga(action) {
  try {
    const response = yield fetch(getCurrentWeather(action.payload.latitude, action.payload.longitude));
    const payload = yield response.json();

    yield put({
      type: FETCH_CURRENT_WEATHER_SUCCESS,
      payload: payload
    });

  } catch (e) {
    yield put({
      type: FETCH_CURRENT_WEATHER_FAIL,
      error: e
    });
  }
}

function* fetchCountriesSaga() {
  try {
    yield put({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: countries
    });
  } catch (e) {
    yield put({
      type: FETCH_COUNTRIES_FAIL,
      error: e
    });
  }
}

export default function* onFetchCurrentWeather() {
  yield all([
    takeEvery(SET_POSITION, fetchCurrentWeatherSaga),
    takeEvery(FETCH_COUNTRIES_REQUEST, fetchCountriesSaga)
  ]);
}
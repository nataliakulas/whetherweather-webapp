import {all, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CURRENT_WEATHER_FAIL, FETCH_CURRENT_WEATHER_SUCCESS, SET_CITY_POSITION, SET_USER_POSITION } from './actions';
import getCurrentWeather from '../shared/api';

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


export default function* onFetchCurrentWeather() {
  yield all([
    takeEvery(SET_USER_POSITION, fetchCurrentWeatherSaga),
    takeEvery(SET_CITY_POSITION, fetchCurrentWeatherSaga)
  ])
}
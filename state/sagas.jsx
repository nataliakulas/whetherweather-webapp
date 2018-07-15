import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_CURRENT_WEATHER_FAIL, FETCH_CURRENT_WEATHER_SUCCESS, SET_USER_POSITION } from './actions';
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
  yield takeEvery(SET_USER_POSITION, fetchCurrentWeatherSaga);
}
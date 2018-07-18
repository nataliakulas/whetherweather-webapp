import rootReducer from './reducers';

describe('reducer', () => {
  it('should return initial state', () => {
    expect(
      rootReducer(undefined, {})
    ).toEqual(
      {
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
        active: false,
        countries: [],
        favs: []
      }
    );
  });
});
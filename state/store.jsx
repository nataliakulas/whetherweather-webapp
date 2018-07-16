import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favsState']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore() {
  const store = createStore(
    persistedReducer,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  persistStore(store);

  return store;
}

export default configureStore;
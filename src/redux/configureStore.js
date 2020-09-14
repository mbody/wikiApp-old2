// redux/configureStore.js

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import favorites from './favorites';
import wikipedia from './wikipedia';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['wikipedia'],
};

const rootReducer = combineReducers({
  favorites,
  wikipedia,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);

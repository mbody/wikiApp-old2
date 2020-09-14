// redux/configureStore.js

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {createStore, combineReducers} from 'redux';
import favorites from './favorites';

const persistConfig = {key: 'root', storage: AsyncStorage};

const rootReducer = combineReducers({
  favorites,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// redux/configureStore.js

import { createStore, combineReducers } from 'redux';
import favorites from './favorites';

const rootReducer = combineReducers({
    favorites
});

export const configureStore = () => {
    return createStore(rootReducer);
};

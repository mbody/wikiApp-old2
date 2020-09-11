//redux/favorites.js

// Actions
const ADD = 'wiki-app/favorites/ADD';
const REMOVE = 'wiki-app/favorites/REMOVE';


// Action Creators
export const addFavoriteAction = (page) => ({type: ADD, page});
export const removeFavoriteAction = (page) => ({type: REMOVE, page});

// initial state
const initialState = {pages: []};

// Reducer (with export default)
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD:
            // TODO : add action payload to state favorites
            break;
        case REMOVE:
            // TODO : remove action payload to state favorites
            break;
    }
    return state;
}


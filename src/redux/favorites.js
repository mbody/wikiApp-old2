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
    return {
        ...state,
        pages: state.pages.concat(action.page),
    };
  case REMOVE:
    return {
      ...state,
        pages: state.pages.filter((p) => p.pageid != action.page.pageid),
      };
      break;
  }
  return state;
}

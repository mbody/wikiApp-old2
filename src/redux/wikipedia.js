//redux/wikipedia.js

// Actions
import {wikiService} from '../services/WikiService';

const SEARCH_PENDING = 'wiki-app/wikipedia/SEARCH_PENDING';
const SEARCH_SUCCESS = 'wiki-app/wikipedia/SEARCH_SUCCESS';
const SEARCH_FAILURE = 'wiki-app/wikipedia/SEARCH_FAILURE';
const SEARCH_CLEAR = 'wiki-app/wikipedia/SEARCH_CLEAR';

// Action Creators
export const searchPendingAction = (offset) => ({type: SEARCH_PENDING, offset});
export const searchSuccessAction = (searchResult, offset) => ({
  type: SEARCH_SUCCESS,
  searchResult,
  offset,
});
export const searchFailureAction = (error) => ({type: SEARCH_FAILURE, error});
export const searchClearAction = () => ({type: SEARCH_CLEAR});

export const searchAction = (keyword, offset) => {
  return async (dispatch, getState) => {
    const isPending = getState().wikipedia.searchPending;
    if (!isPending) {
      dispatch(searchPendingAction(offset));
      try {
        const searchResult = await wikiService.search(keyword, offset);
        dispatch(searchSuccessAction(searchResult, offset));
      } catch (e) {
        console.error(e);
        dispatch(searchFailureAction(e));
      }
    }
  };
};

// initial state
const initialState = {searchResult: null, searchPending: false, error: null};

// Reducer (with export default)
export default function reducer(state = initialState, action = {}) {
  // console.log("WIKI REDUCER with action " + action.type + ', searchResult.length= ' + (state.searchResult ? state.searchResult.length : 'null') + ', offset= ' + action.offset);
  switch (action.type) {
    case SEARCH_PENDING:
      return {
        ...state,
        searchPending: true,
        searchResult: action.offset === 0 ? null : state.searchResult,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult:
          action.offset === 0
            ? action.searchResult
            : state.searchResult.concat(action.searchResult),
        searchPending: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        error: action.error,
        searchPending: false,
      };
    case SEARCH_CLEAR:
      return initialState;
  }
  return state;
}

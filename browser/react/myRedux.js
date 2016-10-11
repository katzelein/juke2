const redux = require('redux');
const GET_ALBUMS_FROM_SERVER = 'GET_ALBUMS_FROM_SERVER';
const initialState = require('./initialState.js');

function reducer (state = initialState, action){
  switch (action.type){
    case GET_ALBUMS_FROM_SERVER:
      return Object.assign({}, state, {
        allAlbums: action.albums
      });
    default: return state;
  }
}

let store = redux.createStore(reducer);

store.getState();
store.dispatch({ type: GET_ALBUMS_FROM_SERVER, albums: []});
store.getState();

module.exports = store;

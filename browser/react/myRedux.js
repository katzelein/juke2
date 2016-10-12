const redux = require('redux');
import {applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {convertAlbum} from './containers/AppContainer';

const GET_ALBUMS_FROM_SERVER = 'GET_ALBUMS_FROM_SERVER';
const initialState = require('./initialState.js');

function reducer (state = initialState, action){
  switch (action.type){
    case GET_ALBUMS_FROM_SERVER:
      return Object.assign({}, state, {
        albums: action.albums
      });
    default: return state;
  }
}

const getAlbums = function(albums){
  return { type: GET_ALBUMS_FROM_SERVER, albums }
};

export const fetchAlbumsFromServer =() => {
  return dispatch =>
    fetch('/api/albums')
      .then(res => res.json())
      .then(albums => {
        albums.map(album => {
          convertAlbum(album);
        })
        dispatch(getAlbums(albums));
      })
}

export let store = redux.createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));

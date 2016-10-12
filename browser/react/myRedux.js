const redux = require('redux');
import {applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {convertAlbum} from './containers/AppContainer';
import {combineReducers} from 'redux';

const GET_ALBUMS_FROM_SERVER = 'GET_ALBUMS_FROM_SERVER';
const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING'
const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
const initialState = require('./initialState.js');

function albums (state = initialState, action){
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
export const play = () => dispatch => {
  AUDIO.play();
  dispatch(startPlaying());
};

export const pause = () => dispatch => {
  AUDIO.pause();
  dispatch(stopPlaying());
};

export const load = (currentSong, currentSongList) => dispatch => {
  AUDIO.src = currentSong.audioUrl;
  AUDIO.load();
  dispatch(setCurrentSong(currentSong, currentSongList));
};

export const startSong = (song, list) => dispatch => {
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
};

export const toggle = () => (dispatch, getState) => {
  const { isPlaying } = getState();
  if (isPlaying) dispatch(pause());
  else dispatch(play());
};

export const toggleOne = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
    const { currentSong } = getState();
    if (selectedSong.id !== currentSong.id)
      dispatch(startSong(selectedSong, selectedSongList));
    else dispatch(toggle());
};

function isPlaying (state = false, action){
  switch (action.type) {
    case START_PLAYING: return true;
    case STOP_PLAYING: return false;
    default: return state;
  }
}

const currentSong = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSong;
    default: return state;
  }
};

const currentSongList = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSongList;
    default: return state;
  }
};

export const rootReducer = combineReducers({
  albums,
  isPlaying,
  currentSong,
  currentSongList
});

export let store = redux.createStore(albums, applyMiddleware(createLogger(), thunkMiddleware));

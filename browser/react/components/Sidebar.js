'use strict';

import React from 'react';
import Albums from './Albums.js';
//import AlbumsContainer from '../containers/AlbumsContainer.js'


export default class Sidebar extends React.Component(){
  componentDidMount(){
    fetch('api/albums')
    .then(toJson)
    .then(allAlbums => {
      allAlbums.audioUrl = `/api/0/songs/0`;
      this.setState({albumsArray: allAlbums})
    })
  }
  render(){
    return (
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <a href="#">ALBUMS</a>
          </h4>
          <Albums allAlbums = {albumsObj}/>
        </section>
      </sidebar>
    )
  }
}

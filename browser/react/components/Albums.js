import React from 'react';
import {store, fetchAlbumsFromServer} from '../myRedux.js'
import {convertAlbum, convertSong} from '../containers/AppContainer.js'

export default class Albums extends React.Component {
  componentDidMount(){
    this.props.getAlbums();
  }
  render (props) {
    if (!this.props.albums) {
      return <h1>Loading...</h1>
    }
    return(
      <div>
        <h3>Albums</h3>
        <div className="row">
          {
            this.props.albums.map(function(album) {
              return (
                <div className="col-xs-4" key={album.id}>
                  <a className="thumbnail" href="#">
                    <img src={album.imageUrl} />
                    <div className="caption">
                      <h5>
                        <span>{album.name}</span>
                      </h5>
                      <small>{album.songs.length} songs</small>
                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

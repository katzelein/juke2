import connect from 'react-redux';
import Albums from '../components/Albums.js';

const AlbumsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums)


const mapStateToProps = function(state, ownProps){
  return {
    albums: state.albums
  };
};

const mapDispatchToProps = function(dispatch, ownProps){
  return {
    getAlbums: function(albums){
      dispatch({
        type: 'GET_ALBUMS_FROM_SERVER',
        albums
      });
    }
  }
}

export default AlbumsContainer;

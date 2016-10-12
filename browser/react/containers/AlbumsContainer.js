import {connect} from 'react-redux';
import Albums from '../components/Albums.js';
import {fetchAlbumsFromServer} from '../myRedux.js';

const AlbumsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums)


function mapStateToProps (state, ownProps){
  return {
    albums: state.albums
  };
};

function mapDispatchToProps (dispatch, ownProps){
  return {
    getAlbums: function(){
      dispatch(fetchAlbumsFromServer())
    }
  }
}

export default AlbumsContainer;

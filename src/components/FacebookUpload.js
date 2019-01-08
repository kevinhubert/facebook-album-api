import React from "react";
import Album from "./Album";
import { facebookLogin, getAlbums } from "../mixins/facebook";

class FacebookUpload extends React.Component {
  // Initialize State
  constructor(props) {
    super(props);
    this.state = {
      albumsObj: {
        data: [],
        paging: {},
        albumId: null
      }
    };
  }

  handleLoginStatus = () => {
    facebookLogin();
  };

  // Get first set of albums and update state
  getFirstAlbums = () => {
    window.FB.api(
      "/me?fields=albums.limit(10){name,count,cover_photo{picture}}",
      response => {
        this.setState({
          albumsObj: response.albums
        });
      }
    );
  };

  // Pagination to get next albums and updates state
  getNextAlbums = () => {
    if (this.state.albumsObj.paging.hasOwnProperty("next")) {
      fetch(this.state.albumsObj.paging.next)
        .then(response => response.json())
        .then(response => {
          this.setState({ albumsObj: response });
        });
    }
  };

  // Pagination to get previous albums and updates state
  getPreviousAlbums = () => {
    if (this.state.albumsObj.paging.hasOwnProperty("previous")) {
      fetch(this.state.albumsObj.paging.previous)
        .then(response => response.json())
        .then(response => {
          this.setState({ albumsObj: response });
        });
    }
  };

  // Get first photos for individual album
  getAlbumImages = id => {
    const albumId = (this.state = { ...this.state.albumId });
    albumId.flag = true;
    this.setState({ albumId: id });

    // window.FB.api(
    //   albumId + "/?fields=photos.limit(10){picture,images}",
    //   response => {
    //     console.log(response);
    //   }
    // );
  };

  render() {
    return (
      <div>
        <h1>Facebook Albums</h1>
        <button onClick={this.handleLoginStatus}>Check if logged in</button>
        <button onClick={this.getFirstAlbums}>Click to get Albums</button>
        <button onClick={this.getPreviousAlbums}>Get Previous Albums</button>
        <button onClick={this.getNextAlbums}>Get More Albums</button>
        <ul>
          {this.state.albumsObj.data.map(album => {
            return (
              <Album
                data={album}
                key={album.id}
                getSelectedAlbumId={this.getAlbumImages}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default FacebookUpload;

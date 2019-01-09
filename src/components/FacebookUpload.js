import React from "react";
import Album from "./Album";
import { facebookLogin, getAlbums } from "../mixins/facebook";
import ImageList from "./ImageList";

class FacebookUpload extends React.Component {
  // Initialize State
  constructor(props) {
    super(props);
    this.state = {
      albumsObj: {
        data: [],
        paging: {},
        albumId: null
      },
      currentAlbum: {},
      imagesObj: {
        data: [],
        paging: {},
        imageId: null
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
  getAlbumImages = album => {
    console.log(this.state);
    this.setState({ currentAlbum: album });
    console.log(this.state);
    // window.FB.api(
    //   this.state.currentAlbum.id + "/?fields=photos.limit(10){picture,images}",
    //   response => {
    //     console.log(response.photos);
    //     this.setState({ imagesObj: response.photos });
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
                album={album}
                key={album.id}
                getAlbumImages={this.getAlbumImages}
              />
            );
          })}
        </ul>
        <h1>{this.state.currentAlbum.name}</h1>
      </div>
    );
  }
}

export default FacebookUpload;

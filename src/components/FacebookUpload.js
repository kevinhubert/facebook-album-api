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
      },
      displayAlbums: true,
      displayImages: false,
      selectedImage: ""
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
    this.setState({ currentAlbum: album }, () => {
      window.FB.api(
        this.state.currentAlbum.id +
          "/?fields=photos.limit(10){picture,images}",
        response => {
          this.setState({ imagesObj: response.photos });
          console.log(response);
        }
      );
    });
    this.setState({ displayAlbums: false, displayImages: true });
  };

  //Get Additional Images in single album
  getNextImages = () => {
    if (this.state.imagesObj.paging.hasOwnProperty("next")) {
      fetch(this.state.imagesObj.paging.next)
        .then(response => response.json())
        .then(response => {
          this.setState({ imagesObj: response });
        });
    }
  };

  //Get previous Images in single album
  getPreviousImages = () => {
    if (this.state.imagesObj.paging.hasOwnProperty("previous")) {
      fetch(this.state.imagesObj.paging.previous)
        .then(response => response.json())
        .then(response => {
          this.setState({ imagesObj: response });
        });
    }
  };

  // Go back to albums
  backToAlbums = () => {
    this.setState({ displayAlbums: true, displayImages: false });
  };

  getSelectedImage = image => {
    this.setState({ selectedImage: image }, console.log(image));
  };

  render() {
    if (this.state.displayAlbums === true) {
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
        </div>
      );
    }
    return (
      <div>
        <ImageList
          currentAlbum={this.state.currentAlbum}
          imageList={this.state.imagesObj.data}
          getNextImages={this.getNextImages}
          getPreviousImages={this.getPreviousImages}
          backToAlbums={this.backToAlbums}
          getSelectedImage={this.getSelectedImage}
        />
      </div>
    );
  }
}

export default FacebookUpload;

import React from "react";
import SingleImage from "./SingleImage";

class ImageList extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.backToAlbums}>Back to Albums</button>
        <button onClick={this.props.getNextImages}>Get Next Images</button>
        <button onClick={this.props.getPreviousImages}>
          Get Previous Images
        </button>
        <h1>{this.props.currentAlbum.name}</h1>
        <ul>
          {this.props.imageList.map(image => {
            return (
              <SingleImage
                image={image}
                getSelectedImage={this.props.getSelectedImage}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ImageList;

import React from "react";

class ImageList extends React.Component {
  render() {
    const { picture } = this.props.image;
    return (
      <li>
        <img src={picture} />
      </li>
    );
  }
}

export default ImageList;

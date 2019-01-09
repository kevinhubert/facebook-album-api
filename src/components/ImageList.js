import React from "react";

class ImageList extends React.Component {
  render() {
    const { picture } = this.props.data;
    return (
      <div>
        <img src={picture} />
      </div>
    );
  }
}

export default ImageList;

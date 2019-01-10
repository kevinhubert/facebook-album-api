import React from "react";

class SingleImage extends React.Component {
  render() {
    const { picture } = this.props.image;

    return (
      <li>
        <img
          src={picture}
          onClick={() => this.props.getSelectedImage(this.props.image)}
        />
      </li>
    );
  }
}

export default SingleImage;

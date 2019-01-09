import React from "react";

class Album extends React.Component {
  render() {
    const { getAlbumImages } = this.props;
    const { name, cover_photo, id } = this.props.album;
    return (
      <li onClick={() => getAlbumImages(this.props.album)}>
        <div>{name}</div>
        <img src={cover_photo.picture} alt={name} />
      </li>
    );
  }
}

export default Album;

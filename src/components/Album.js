import React from "react";

class Album extends React.Component {
  render() {
    const { getAlbumImages } = this.props;
    const { name, cover_photo, id } = this.props.data;
    return (
      <li onClick={() => getAlbumImages(id)}>
        <div>{name}</div>
        <img src={cover_photo.picture} alt={name} />
      </li>
    );
  }
}

export default Album;

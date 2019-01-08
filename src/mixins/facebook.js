export const facebookLogin = () => {
  window.FB.login(
    response => {
      if (response.authResponse) console.log("Logged in");
      else console.log("Not logged in");
    },
    { scope: "user_photos" }
  );
};

// Get first set of albums and update state
export const getFirstAlbums = () => {
  window.FB.api(
    "/me?fields=albums.limit(10){name,count,cover_photo{picture}}",
    response => {
      this.setState({
        albumsObj: response.albums
      });
    }
  );
};

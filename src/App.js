import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./component/DataLayer";
import Login from "./component/Login";
import Player from "./component/Player";
import { getTokenFromResponse } from "./component/spotify";
const s = new SpotifyWebApi();
function App() {
  const [token, dispatch] = useStateValue();

  useEffect(
    () => {
      // Set token
      const hash = getTokenFromResponse();
      window.location.hash = "";
      let _token = hash.access_token;

      if (_token) {
        s.setAccessToken(_token);
        dispatch({
          type: "SET_TOKEN",
          token: _token,
        });
        s.getUserPlaylists().then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists,
          });
        });
        s.getFollowedArtists().then(function (data) {
          dispatch({
            type: "SET_FOLLOWED",
            following: data,
          });
        });

        s.getMe().then((user) => {
          dispatch({
            type: "SET_USER",
            user,
          });
        });
        // Get the User's Currently Playing Track
        // s.getMyCurrentPlayingTrack().then(
        //   function (data) {
        //     console.log("Now playing: " + data.item.name);
        //   },
        //   function (err) {
        //     console.log("Something went wrong!", err);
        //   }
        // );
      }
    },

    [dispatch, token] // []
  );

  return (
    <div>
      {!token && <Login />}
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;

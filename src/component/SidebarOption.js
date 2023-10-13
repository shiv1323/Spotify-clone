import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "../component_css/SidebarOption.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./DataLayer";
const dummy_image =
  "https://iconicentertainment.in/wp-content/uploads/2013/11/dummy-image-square.jpg";

const spotify = new SpotifyWebApi();

function SidebarOption({
  option = "test",
  img = dummy_image,
  type,
  owner,
  id,
}) {
  const [{ token }, dispatch] = useStateValue();

  const click = (x = "") => {
    const playlistIdRegex = /spotify:playlist:(\w+)/;
    const matches = x.match(playlistIdRegex);
    const playlistId = matches ? matches[1] : null;

    if (token) {
      spotify.getPlaylist(playlistId).then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  };

  return (
    <>
      <div className="sidebarOption bg-[#121212] cursor-pointer pl-3 w-auto ">
        <Link to="/playlists">
          <div className="container__box" onClick={() => click(id)}>
            <img
              className="image__playlist"
              alt="playlist_image"
              src={img.url}
              loading="lazy"
            />
            <div className="type-spot-wrapper">
              <div className="owner-playlist-spot text-white">
                <p>{option}</p>
                <p>
                  <span>{type}</span> . <span>{owner}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default SidebarOption;

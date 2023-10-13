import React from "react";
import "../component_css/Body.css";
import "../component_css/SongRow.css";
import { useStateValue } from "./DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { MdArrowBackIosNew } from "react-icons/md";
import SpotifyWebApi from "spotify-web-api-js";
import { BiTime } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
const spotify = new SpotifyWebApi();

function MillisecondsToMinutes(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return formattedTime;
}

const Discoverweekly = () => {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id = "") => {
    let playlistIdRegex = /spotify:playlist:(\w+)/;
    let matches = id.match(playlistIdRegex);
    let playlistId = matches ? matches[1] : null;

    spotify
      .play({
        context_uri: `${playlistId}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
        alert("reason: Premium required 😔");
      })
      .catch(() => "");
  };
  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      })
      .catch(() => alert("reason: Premium required"));
  };

  return (
    <div className="body gradient__bg rounded-lg bg-[#121212]">
      <Link to="/">
        <MdArrowBackIosNew className="h-8 w-8 bg-[#202020] rounded-full" />
      </Link>

      <div>
        <div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4">
              <img
                src={discover_weekly?.images[0].url}
                alt="discoverweekly"
                className="h-[20vw] mx-5 shadow-lg rounded-lg"
                loading="lazy"
              />
            </div>
            <div className=" body__infoText w-full md:flex-1 p-4 mt-11">
              <strong>PLAYLIST</strong>
              <h2 className="font-bold text-6xl">{discover_weekly?.name}</h2>
              <p>{parse(`${discover_weekly?.description}`)}</p>
            </div>
          </div>

          <div className="body__songs">
            <div className="body__icons">
              <PlayCircleFilledIcon
                className="body__shuffle"
                onClick={playPlaylist(discover_weekly?.uri)}
              />
              <FavoriteIcon fontSize="large" />
              <FiMoreHorizontal className="text-[#A7A7A7] h-6 w-6" />
            </div>
            <div className="w-full overflow-x-auto p-6">
              <table className="min-w-full">
                <thead>
                  <tr className="text-[#A7A7A7] border-b border-[#A7A7A7]">
                    <th className="py-2 px-4 text-left font-bold">#</th>
                    <th className="py-2 px-4 text-left font-bold">Title</th>
                    <th className="py-2 px-4 text-left font-bold">Album</th>
                    <th className="py-2 px-4 text-left font-bold ">
                      <BiTime className="h-6 w-6" />
                    </th>
                  </tr>
                </thead>
                {discover_weekly?.tracks.items.map((item, key) => (
                  <>
                    <tbody
                      key={key}
                      className="text-center cursor-pointer  hover:bg-[#ffffff1a] hover:transition hover:delay-100 hover: ease-in text-[#A7A7A7] hover:text-white "
                      onClick={() => playSong(item.track.id)}
                    >
                      <tr key={key}>
                        <td className="py-2 px-4 ">{key + 1}</td>
                        <td className="py-2 px-4 flex ">
                          <img
                            className="songRow__album"
                            src={item.track.album.images[0].url}
                            alt=""
                            loading="lazy"
                          />
                          <div className="songRow__info text-left ">
                            <h1 className="font-bold text-white">
                              {item.track.name}
                            </h1>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis w-32">
                              {item.track.album.artists
                                .map((artist) => artist.name)
                                .join(", ")}{" "}
                              - {item.track.album.name}
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left font-semibold ">
                          {item.track.name}
                        </td>
                        <td className="py-2 px-4 ">
                          {MillisecondsToMinutes(item.track.duration_ms)}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discoverweekly;

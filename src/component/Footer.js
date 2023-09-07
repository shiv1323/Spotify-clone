import React, { useEffect } from "react";
import { useStateValue } from "./DataLayer";
import "../component_css/Footer.css";
import { Grid } from "@material-ui/core";
import {
  BsShuffle,
  BsFillVolumeUpFill,
  BsLaptop,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import {
  FaRegHeart,
  FaPauseCircle,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { useState } from "react";

function Footer({ spotify }) {
  const [{ item, playing, token }, dispatch] = useStateValue();
  const [device, setDevice] = useState([]);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [dispatch, spotify]);

  const handlePlayPause = async () => {
    try {
      if (playing) {
        await spotify.pause();
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      } else {
        await spotify.play();
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    } catch (error) {
      alert("reason: Premium required 😔.");
    }
  };

  const skipNext = async () => {
    try {
      await spotify.skipToNext();
      const r = await spotify.getMyCurrentPlayingTrack();
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    } catch {
      alert("reason: Premium required 😔.");
    }
  };

  const skipPrevious = async () => {
    try {
      await spotify.skipToPrevious();
      const r = await spotify.getMyCurrentPlayingTrack();
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    } catch (error) {
      alert("reason: Premium required 😔.");
    }
  };

  const repeatSong = () => {
    spotify
      .setRepeat("track")
      .then(
        dispatch({
          type: "SET_REPEAT",
          repeat: true,
        })
      )
      .catch(() => alert("reason: Premium required 😔."));
  };

  const suffle = () => {
    spotify.setShuffle(true).then(
      function () {
        dispatch({
          type: "SET_SUFFLE",
          suffle: true,
        });
      },
      function () {
        alert("reason: Premium required 😔.");
      }
    );
  };

  useEffect(() => {
    if (token) {
      spotify.getMyDevices().then(function (data) {
        let availableDevices = data.devices;
        setDevice(availableDevices);
      });
    }
  }, []);

  const deviceName =
    device.length > 0
      ? device[0].is_active
        ? device[0].name
        : "No Device active"
      : "No Device active";

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
        &nbsp;&nbsp; <FaRegHeart className="h-7 w-7 cursor-pointer" />
      </div>

      <div className="col-span-2 grid grid-cols-5 top-3 relative">
        <div className="p-2">
          <BsShuffle
            className="footer__green h-5 w-5 cursor-pointer text-[#A7A7A7]"
            onClick={suffle}
          />
        </div>

        <div className="p-2">
          <FaStepBackward
            onClick={skipPrevious}
            className="footer__icon cursor-pointer text-[#A7A7A7] h-6 w-6 "
          />
        </div>
        {playing ? (
          <div className="p-2">
            <FaPauseCircle
              onClick={handlePlayPause}
              className="footer__icon cursor-pointer text-[#A7A7A7] h-6 w-6"
            />
          </div>
        ) : (
          <div className="p-2">
            <BsFillPlayCircleFill
              onClick={handlePlayPause}
              className="footer__icon cursor-pointer text-[#A7A7A7] h-6 w-6"
            />
          </div>
        )}
        <div className="p-2">
          <FaStepForward
            className="footer__icon cursor-pointer text-[#A7A7A7] h-6 w-6"
            onClick={skipNext}
          />
        </div>

        <div className="p-2">
          <RxLoop
            className="footer__green h-6 w-6 cursor-pointer text-[#A7A7A7] "
            onClick={repeatSong}
          />
        </div>
      </div>
      <div className=" text-[#A7A7A7] flex justify-end top-6 relative">
        <Grid container spacing={2}>
          <Grid item>
            <div className=" absolute inset-0 flex items-center justify-center left-[-12rem]  ml-2 top-[-5rem] w-auto rounded-lg cursor-pointer">
              <p className="text-base font-bold ">{deviceName}</p>
            </div>
            <BsLaptop className="h-6 w-6 cursor-pointer text-[#1ed15e]" />
          </Grid>
          <Grid item>
            <BsFillVolumeUpFill className="h-6 w-6 cursor-pointer" />
          </Grid>
          <Grid item xs>
            <div>
              <input type="range" id="input" className="cursor-pointer" />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;

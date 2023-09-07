import React from "react";
import "../component_css/Header.css";
import { useStateValue } from "./DataLayer";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Header({ option, artist }) {
  const [{ user }] = useStateValue();

  const User_Image = user?.images[0]?.url
    ? user?.images[0]?.url
    : "https://static.thenounproject.com/png/17241-200.png";

  // greeting function
  const currentHour = new Date().getHours();
  // Define greeting messages for different times of the day
  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="">
      <div className="header">
        {/* search icon */}
        <div className="header__left w-2/5">
          <SearchIcon />
          <input
            name="users"
            placeholder="Search for Artists, Songs, or Podcasts "
            type="text"
          />
        </div>
        {/* image or avator */}
        <div className="group relative flex justify-end ">
          <Avatar
            alt={User_Image?.display_name}
            src={User_Image}
            className="transition-transform transform-gpu group-hover:scale-110 cursor-pointer"
          />
          <div className=" absolute inset-0 flex items-center justify-center left-auto  opacity-0 group-hover:opacity-100  ml-2 top-12 w-auto rounded-lg">
            <p className="text-base font-bold ">{user?.display_name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-row-1 md:grid-row-2 gap-4">
        {/* greeting */}
        <div>
          <h2 className="text-4xl font-bold md:text-4xl-700 lg:text-4xl-700 xl:text-3xl-700 text-white ">
            {greeting}
          </h2>
        </div>
        {/* images along with playlists */}
        <Link to="/playlists">
          <div className="grid grid-cols-3 md:grid-cols-3 w-full sm:grid-cols-1  gap-y-4 gap-x-6 ">
            {option?.items?.slice(0, 6)?.map((playlist, index) => (
              <div
                className="bg-[#ffffff12] rounded-lg overflow-hidden flex w-[332px] shadow-lg  hover:bg-[#FFFFFF1a] cursor-pointer"
                key={index}
              >
                <img
                  src={playlist.images[0].url}
                  alt="playlistimage"
                  className="h-[80px] w-[80px] "
                />
                <div className="flex flex-1 justify-between py-0 px-4 items-center">
                  <div className="flex flex-row">
                    <h2 className="text-lg font-semibold">{playlist.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
      <div className="grid grid-row-1 md:grid-row-2 gap-4">
        {/* greeting */}
        <div>
          <h2 className="text-4xl font-bold md:text-4xl-700 lg:text-4xl-700 xl:text-3xl-700 text-white mt-5 ">
            Following
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[372px] mt-5">
        {/* {following} */}

        {artist?.artists?.items?.map((item, index) => (
          <div
            className="bg-[#181818] rounded-lg shadow-lg hover:bg-[#FFFFFF1a] p-4 cursor-pointer"
            key={index}
          >
            <div className="rounded-full pb-[100%] ml-6 relative w-full">
              <img
                src={item.images[0].url}
                alt="playlistimage"
                className="rounded-full h-36 left-0 absolute top-0 w-36 shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="inline-block w-full text-center relative ">
              <p className="text-base font-bold pb-1">{item.name}</p>
              <p className="font-normal pb-1 text-[#6a6a6a] text-sm font- ">
                {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;

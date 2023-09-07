import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const SidebarTop = () => {
  return (
    <>
      <div className="bg-[#121212] cursor-pointer rounded-lg ">
        <ul className="px-2 py-3 list-none ">
          <Link to="/">
            <li className="px-1 py-3 flex items-center space-x-2">
              <HomeIcon className="text-white block" />
              <p className="text-base font-bold text-white">Home</p>
            </li>
          </Link>

          <li className="px-1 py-3 flex items-center space-x-2">
            <SearchIcon className="text-white block " />
            <p className="text-base font-bold text-[#A7A7A7] hover:text-white">
              Search
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarTop;

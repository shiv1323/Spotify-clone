import React, { useState } from "react";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import {
  Add,
  ArrowDropDown,
  ArrowDropUp,
  ArrowForward,
} from "@material-ui/icons";
import { styles } from "../styles";
import SearchIcon from "@material-ui/icons/Search";

const SidebarHeadertwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Initially, no option is selected

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const option = ["Recents", "Recently Added", "Alphabetical", "Creator"];

  return (
    <div className="bg-[#121212]  rounded-t-lg rounded-tr-lg rounded-bl shadow-sm">
      <header className="flex flex-col gap-2">
        {/* first header included playlist icon, add and forward arroe icon */}
        <div className="flex items-center justify-between p-3">
          <div
            className={`flex items-center space-x-2 cursor-pointer text-[#A7A7A7] hover:text-white font-bold text-base`}
          >
            <LibraryMusicIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Your Library</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Add className={`h-6 w-6  ${styles.text}`} />
            <ArrowForward className={`h-6 w-6 ${styles.text}`} />
          </div>
        </div>
        {/* second header slides */}
        <div className="overflow-x-auto whitespace-nowrap  p-3 maskImage">
          <button className={`${styles.button}`}>Playlists</button>
          <button className={`${styles.button}`}>Artists</button>
          <button className={`${styles.button}`}>Albums</button>
          <button className={`${styles.button}`}>Podcasts & Shows</button>
        </div>
        {/* dropdown for sorting */}
        <div className="flex justify-between p-3">
          <div className="flex items-center cursor-pointer ">
            <SearchIcon className={`block h-8 w-8 ${styles.text} `} />
          </div>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className={`${styles.dropDown}`}
              id="dropdown-menu"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
            >
              {selectedOption || "Recents"}
              {/* Display the selected option if available */}
              {isOpen ? (
                <ArrowDropUp className="-mr-1 ml-2 h-5 w-5 text-base" />
              ) : (
                <ArrowDropDown className="-mr-1 ml-2 h-5 w-5 text-base" />
              )}
            </button>

            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282828] ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-menu"
              >
                <div className="py-1" role="none">
                  <button className={`${styles.buttonDrop}`} role="menuitem">
                    Sort By
                  </button>
                  {option.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(item)}
                        className={`${styles.buttonDrop} focus:border-none`}
                        role="menuitem"
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* drop */}
      </header>
    </div>
  );
};

export default SidebarHeadertwo;

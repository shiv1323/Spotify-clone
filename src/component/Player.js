import React from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Discoverweekly from "./Discoverweekly";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Player({ spotify }) {
  return (
    <Router>
      <div className="grid px-2 pt-2 gap-2 p-3 grid-cols-[480px,1fr]">
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 sm:w-auto ">
          <Sidebar />
        </div>

        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 sm:w-auto ">
          <Routes>
            <Route path="/" element={<Body spotify={spotify} />} />
            <Route path="/playlists" element={<Discoverweekly />} />
          </Routes>
        </div>
        <Footer spotify={spotify} />
      </div>
    </Router>
  );
}

export default Player;

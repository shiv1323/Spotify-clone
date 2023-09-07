import React from "react";
import "../component_css/Body.css";
import Header from "./Header";
import { useStateValue } from "./DataLayer";

function Body() {
  const [{ playlists, following }] = useStateValue();

  return (
    <div className="body rounded-lg bg-[#121212]">
      <Header option={playlists} artist={following} />
    </div>
  );
}

export default Body;

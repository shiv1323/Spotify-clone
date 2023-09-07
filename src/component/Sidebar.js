import React from "react";

import SidebarOption from "./SidebarOption";
import { useStateValue } from "./DataLayer";
import SidebarTop from "./SidebarTop";
import SidebarHeadertwo from "./SidebarHeadertwo";

function Sidebar() {
  const [{ playlists }] = useStateValue();
  return (
    <div className="grid grid-row-1 sm:grid-row-2 fixed gap-4">
      <div className="h-[112px] w-[480px]">
        <SidebarTop />
        <br />
      </div>
      <div className="h-auto w-[480px]">
        <div className="sm:h-auto relative h-screen mx-auto max-w-screen-lg overflow-hidden">
          <SidebarHeadertwo />
        </div>
        <div className="h-[calc(100vh-400px)] overflow-y-scroll">
          {playlists?.items?.map((playlist, key) => (
            <SidebarOption
              key={key}
              option={playlist.name}
              img={playlist.images[0]}
              type={playlist.type}
              owner={playlist.owner.display_name}
              id={playlist.uri}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

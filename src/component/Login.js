import React from "react";
import { accessUrl } from "./spotify";
function Login() {
  return (
    <div className="grid h-[100vh] place-items-center bg-black">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
        height="200px"
      />
      <a
        href={accessUrl}
        className="text-white p-5 rounded-[99px] font-extrabold bg-green-500 text no-underline "
      >
        Login with Spotify
      </a>
    </div>
  );
}

export default Login;

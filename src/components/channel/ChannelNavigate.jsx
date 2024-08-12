import React from "react";
import { NavLink } from "react-router-dom";

function ChannelNavigate({username}) {
  return (
    <>
      {/* channel options */}
      <section className="text-white w-full flex justify-evenly items-center border-b-2 border-slate-500 text-sm sm:text-base sm:mt-4 md:mt-0 mt-2">

        <NavLink
          to={`/channel/${username}/videos`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2">Videos</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/playlists`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2">Playlists</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/tweets`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2">Tweets</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/subscribed`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2">Subscribed</p>
        </NavLink>
      </section>
    </>
  );
}

export default ChannelNavigate;
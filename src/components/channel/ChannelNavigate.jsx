import React from "react";
import { NavLink } from "react-router-dom";

function ChannelNavigate({ username, edit }) {
  if (edit) {
    return (
      <>
        <section className="text-white text-center w-full flex justify-evenly items-center border-b-2 border-slate-600 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
          <NavLink
            to={`/edit/personalInfo`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
                : ""
            }
          >
            <p className="p-2">Personal Information</p>
          </NavLink>
          <NavLink
            to={`/edit/password`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
                : ""
            }
          >
            <p className="p-2">Change Password</p>
          </NavLink>
        </section>
      </>
    );
  }
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
          <p className="p-2 hover:bg-white hover:border-[#e55542] hover:text-[#e55542]">Videos</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/playlists`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2 hover:bg-white hover:border-[#e55542] hover:text-[#e55542]">Playlists</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/tweets`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2 hover:bg-white hover:border-[#e55542] hover:text-[#e55542]">Tweets</p>
        </NavLink>

        <NavLink
          to={`/channel/${username}/subscribed`}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-[#e55542] border-b-2 border-[#e55542]"
              : ""
          }
        >
          <p className="p-2 hover:bg-white hover:border-[#e55542] hover:text-[#e55542]">Subscribed</p>
        </NavLink>
      </section>
    </>
  );
}

export default ChannelNavigate;
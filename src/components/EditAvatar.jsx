import React, { useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateAvatar, updateCoverImg } from "../store/Slices/authSlice";
import { GetImagePreview } from "./index.js";
import { IoCloseCircleOutline } from "react-icons/io5";

function EditAvatar({ cover, preImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const upload = (data) => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append(`${cover ? "coverImage" : "avatar"}`, data.avatar[0]);

    if (data) {
      if (cover) {
        dispatch(updateCoverImg(formData));
      } else {
        dispatch(updateAvatar(formData));
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(upload)}
        className="relative"
      >
        {/* Popup */}
        <MdOutlineCloudUpload
          className="hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer"
          size={35}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-black relative border shadow-lg w-full max-w-md">
              {/* Content */}
              <h2 className="bg-[#222222] px-5 py-4 border-b font-bold text-white text-xl">
                Change {cover ? "Cover" : "Profile"} Picture
              </h2>

              {/* Close button */}
              <IoCloseCircleOutline
                size={30}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-500 transition"
              />

              <div className="flex flex-col p-8 items-center">
                <GetImagePreview
                  name={"avatar"}
                  control={control}
                  cameraIcon
                  cameraSize={30}
                  className={
                    "w-full h-full object-contain min-h-20 max-h-60 bg-[#222222]"
                  }
                  image={preImage}
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 mt-4 w-full hover:bg-gradient-to-r from-red-500 via-orange-500"
                >
                  Upload
                </button>
              </div>
              {errors.avatar && (
                <span className="text-red-500">
                  {errors.avatar.message}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default EditAvatar;
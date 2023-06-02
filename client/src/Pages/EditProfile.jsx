import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePic: null,
  });
  const [water, setWater] = useState({
    username: "",
    email: "",
    watermark: null,
  });
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [editProfilePicMode, setEditProfilePicMode] = useState(false);
  const [editWatermarkMode, setEditWatermarkMode] = useState(false);
  const [editWatermark, setEditWatermark] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedProfilePic, setEditedProfilePic] = useState(null);
  const [editedWatermark, setEditedWatermark] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const ftechData = async () => {
      const token = sessionStorage.getItem("userToken");
      const res = await fetch("http://localhost:5000/user/auth", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const data = await res.json();
      if (data.status != 401) {
        setUser({
          ...user,
          email: data.email,
          username: data.artist_name,
          profilePic: data.profile_photo || user.profilePic,
          watermark: data.watermark_photo || user.watermark
        });
      } else {
        nav("/login");
      }
    };

    ftechData();
  }, []);

  const handleEditUsername = () => {
    setEditUsernameMode(!editUsernameMode);
  };

  const handleEditProfilePic = () => {
    setEditProfilePicMode(!editProfilePicMode);
  };
  const handleEditWatermark = () => {
    setEditWatermarkMode(!editWatermarkMode);
  };

  const handleSaveChangesProfile = async () => {
    setUser({
      ...user,
      username: editedUsername,
      profilePic: editedProfilePic,
    });

    const response = await fetch('http://localhost:5000/user/updateprofile', {
      method:'POST',
      body:JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json();

    setEditUsernameMode(false);
    setEditProfilePicMode(false);
  };
  const handleSaveChangesWater = async () => {
    setWater({
      ...user,
      watermark: editedWatermark,
    });

    const response = await fetch('http://localhost:5000/user/updatewatermark', {
      method:'POST',
      body:JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json();

    setEditWatermarkMode(false);
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    setEditedProfilePic(file);
  };

  const handleWatermarkUpload = (e) => {
    const file = e.target.files[0];
    setEditedWatermark(file);
  };

  return (
    <div className="flex flex-col gap-10 md:px-20 px-10 py-10">
      <h1 className="header-text text-bold">Profile</h1>
      <div className="flex items-center gap-8">
        <h3 className="h3-header-text text-bold mr-4">Username:</h3>

        {editUsernameMode ? (
          <input
            type="text"
            className="text-black text-xl text-bold mr-4 placeholder-white"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            placeholder="Enter username"
          />
        ) : (
          <p className="text-white text-bold mr-4">{user.username}</p>
        )}

        <button
          className="flex gap-4 w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          onClick={handleEditUsername}
        >
          {editUsernameMode ? "Cancel" : "Edit"}
        </button>

        {editUsernameMode && (
          <button
            className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
            onClick={handleSaveChangesProfile}
          >
            Save
          </button>
        )}
      </div>

      <div className="flex items-center">
        <h3 className="h3-header-text text-bold">Profile Picture:</h3>
        {editProfilePicMode ? (
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="hidden"
              id="profilePicInput"
            />
            <label
              htmlFor="profilePicInput"
              className="cursor-pointer w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white ml-4"
            >
              Upload
            </label>
          </div>
        ) : (
          <div
            style={{
              width: "125px",
              height: "125px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={editedProfilePic || user.profilePic}
              alt="Profile"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        <div className="flex gap-4 ml-4">
          {editProfilePicMode ? (
            <>
              <button
                className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
                onClick={handleSaveChangesProfile}
              >
                Save
              </button>
              <button
                className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
                onClick={handleEditProfilePic}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
              onClick={handleEditProfilePic}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="h3-header-text text-bold">Watermark Picture:</h3>
        {editProfilePicMode ? (
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleWatermarkUpload}
              className="hidden"
              id="profilePicInput"
            />
            <label
              htmlFor="profilePicInput"
              className="cursor-pointer w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white ml-4"
            >
              Upload
            </label>
          </div>
        ) : (
          <div
            style={{
              width: "125px",
              height: "125px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={editedWatermark || water.watermark}
              alt="Profile"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        <div className="flex gap-4 ml-4">
          {editWatermarkMode ? (
            <>
              <button
                className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
                onClick={handleSaveChangesWater}
              >
                Save
              </button>
              <button
                className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
                onClick={handleEditWatermark}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
              onClick={handleEditWatermark}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-10 items-center">
        <h3 className="h3-header-text text-bold">Email:</h3>
        <p className="text-white text-bold">{user.email}</p>
      </div>
    </div>
  );
};

export default EditProfile;

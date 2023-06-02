import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EditProfile = () => {
  const nav = new useNavigate();

  const [profile, setProfile] = useState({
    artist_name: "",
    email: "",
    file: null
  });
  const [water, setWater] = useState({
    email: "",
    file: null
  });

  useEffect(() => {
    const validate = async () => {
      const token = sessionStorage.getItem("userToken");
      if (!token) {
        nav("/login");
      }
      const res = await fetch("https://artlab-3629.onrender.com/user/auth", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const data = await res.json();

      if (data.status == 401) {
        nav("/login");
      } else {
        setProfile({ ...profile, artist_name: data.artist_name, email: data.email, file: data.file || profile.file });
        setWater({ ...water, email: data.email, file: data.file || water.file });
      }
    };
    validate();
  }, []);

  const handleName = async (e) => {
    e.preventDefault()
    const { artist_name, email, file} = profile
    const data=new FormData()
    data.append("artist_name",artist_name)
    data.append("file", file)
    data.append("email", email)
    try{

      await axios.post("https://artlab-3629.onrender.com/user/updateprofile", data);
    }catch(err){
      console.log(err)
    }
  }

  const uploadWatermark = async (e) => {
    e.preventDefault()
    const { email, file} = water
    const data=new FormData()
    data.append("file",file)
    data.append("email",email)
    console.log(water)
    try{

      await axios.post("https://artlab-3629.onrender.com/user/updatewatermark", data);
    }catch(err){
      console.log(err)
    }
  }

  const handleProfilePic = (e) => {
    e.preventDefault()
    setProfile({ ...profile, file: e.target.files[0] })
  }

  const handleWater = (e) => {
    e.preventDefault()
    setWater({ ...water, file: e.target.files[0] })
  }

  return (
    <div className="text-white md:px-20 px-10 py-10 flex flex-col gap-10">
      <h1 className="sub-header-text">Edit Your Profile</h1>
      <form action="" className="flex justify-evenly mt-10">
        <span>Username</span>
        <input
          className="text-black px-5 py-1 outline-none rounded-lg"
          name="artist_name"
          value={profile.artist_name}
          type="text"
          onChange={handleName}
          placeholder={profile.artist_name} />
        <button
          onClick={handleName}
          type="submit"
          className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white">
            Change
        </button>
      </form>

      <form action="" className="flex justify-evenly">
        <span>Profile Picture</span>
        <input
          name="file"
          onChange={handleProfilePic}
          type="file" />
        <button type="submit" onClick={handleName} className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white">Change</button>
      </form>

      <form action="" className="flex justify-evenly">
        <span>Watermark</span>
        <input
          name="file"
          onChange={handleWater}
          type="file" />
        <button type="submit" onClick={uploadWatermark} className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white">Change</button>
      </form>

      <button className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white mt-20"
        onClick={nav('/feed')}
      >
        Back
      </button>

    </div>
  )
}

export default EditProfile
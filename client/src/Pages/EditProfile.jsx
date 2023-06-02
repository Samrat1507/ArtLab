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
      const res = await fetch("http://localhost:5000/user/auth", {
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

      await axios.post("http://localhost:5000/user/updateprofile", data);
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

      await axios.post("http://localhost:5000/user/updatewatermark", data);
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
    <div className="text-white">
      <form action="">
        <span>Username</span>
        <input
          className="text-black"
          name="artist_name"
          value={profile.artist_name}
          type="text"
          onChange={handleName}
          placeholder={profile.artist_name} />
        <button
          onClick={handleName}
          type="submit">Change Name</button>
      </form>

      <form action="">
        <span>Profile Picture</span>
        <input
          name="file"
          onChange={handleProfilePic}
          type="file" />
        <button type="submit" onClick={handleName}>Change</button>
      </form>

      <form action="">
        <span>Watermark</span>
        <input
          name="file"
          onChange={handleWater}
          type="file" />
        <button type="submit" onClick={uploadWatermark}>Change</button>
      </form>


    </div>
  )
}

export default EditProfile
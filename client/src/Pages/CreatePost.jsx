import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreatePost = () => {
  const nav = new useNavigate();
  const [img, setimg] = useState("");

  const [details, setDetails] = useState({
    title: "",
    desc: "",
    amt: "0",
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
      }
    };
    validate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(img.size > 5*1024*1024){
      console.log("too big")
      return
    }
    const formData = new FormData();
    formData.append("image", img);
    formData.append("title", details.title);
    formData.append("desc", details.desc);
    formData.append("amt", details.amt);
    console.log(formData);

    
    axios.post('http://localhost:5000/post/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <div className="py-10 md:px-20 px-10 flex  flex-col gap-10 items-center">
      <h2 className="sub-header-text">Create a Post</h2>
      <form
        className="flex md:flex-row flex-col gap-10 items-center justify-center"
      >
        <div className="flex flex-col gap-6 w-fit">
          <input
            type="text"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            className="px-5 py-2 rounded-xl outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={handleChange}
            name="desc"
            className="px-5 py-2 rounded-xl outline-none"
          />
          <input
            type="text"
            placeholder="Starting Amount"
            onChange={handleChange}
            name="amt"
            className="px-5 py-2 rounded-xl outline-none"
          />
          <div className="flex gap-2 text-white ">
            <input type="checkbox" value="Watermark?" name="watermark"/>
            <label htmlFor="">Watermark?</label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg text-white">
          <div className="flex-1 flex flex-col items-center justify-center glassmorphism rounded-xl md:px-10 px-2 py-5">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              name="image"
              onChange={(e) => setimg(e.target.files[0])}
            />
            <label htmlFor="file-upload" className="py-10 text-xl">
              Upload a File
            </label>
          </div>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;

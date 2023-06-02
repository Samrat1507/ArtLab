import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const nav = new useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amt: "",
    file: null,
    artist_name: "",
  });

  const [alert, setAlert] = useState("");

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
        setFormData({ ...formData, artist_name: data.artist_name });
      }
    };
    validate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, amt, file, artist_name } = formData;

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("amt", amt);
    data.append("file", file);
    data.append("artist_name", artist_name);

    const token = localStorage.getItem("userToken");
    try {
      await axios.post("http://localhost:5000/post/create", data, {
        headers: {
          token: token,
        },
      });
      setAlert("Posted!");
    } catch (error) {
      console.error("Error adding Image:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  return (
    <div className="py-10 md:px-20 px-10 flex  flex-col gap-10 items-center">
      <h2 className="sub-header-text">Create a Post</h2>
      <form className="flex md:flex-row flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-6 w-fit">
          <input
            type="text"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            value={formData.title}
            className="px-5 py-2 rounded-xl outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={formData.description}
            className="px-5 py-2 rounded-xl outline-none"
          />
          <input
            type="text"
            placeholder="Starting Amount"
            onChange={handleChange}
            value={formData.amt}
            name="amt"
            className="px-5 py-2 rounded-xl outline-none"
          />
          <div className="flex gap-2 text-white ">
            <input type="checkbox" value="Watermark?" name="watermark" />
            <label htmlFor="">Watermark?</label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg text-white">
          <div className="flex-1 flex flex-col items-center justify-center glassmorphism rounded-xl md:px-10 px-2 py-5">
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="file-upload" className="py-10 text-xl">
              Upload a File
            </label>
          </div>
        </div>
      </form>
      <div className="flex flex-row  gap-5">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
        >
          Submit
        </button>
        <button
          className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          onClick={(e) => nav("/feed")}
        >
          Back
        </button>
      </div>
      <span className="text-white">{alert}</span>
    </div>
  );
};

export default CreatePost;

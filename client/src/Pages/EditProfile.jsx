import React, { useState, useEffect } from "react";

const EditProfile = () => {

  const [user, setUser] = useState('')

  useEffect(() => {
    async function validate() {
      const token = sessionStorage.getItem("userToken");
      const res = await fetch("http://localhost:5000/user/auth", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const data = await res.json();
      if (data.status != 401) console.log(data);
      else {
        console.log(data.status);
        nav("/login");
      }
    }
  });
  return <div>EditProfile</div>;
};

export default EditProfile;

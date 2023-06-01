import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  // const [File, setFile] = useState("");
  const img=new FormData()
  const nav = new useNavigate()

  const [details, setDetails] = useState({
    title:"",
    desc:"",
    img:"",
    watermark:false,
  })

  useEffect(()=> {
    const validate = async () => {
      const token = sessionStorage.getItem("userToken")
      if(!token){
        nav('/login')
      }
        const res = await fetch('http://localhost:5000/user/auth', {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        })
  
        const data = await res.json();

        if(data.status == 401){
          nav('/login')
        }
        
      }
      validate()
  }, [])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    img.append("img",File)
    const response=await fetch('http://localhost:5000/post/create',{
      method:'POST',
      body:JSON.stringify({formdetails:details,file:img}),
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    const data= await response.json()
    console.log(data)
  }
  const handleChange=(e)=>{
    const {name,value}=e.target
    setDetails({...details,[name]:value});
  }

  const convertToBase64=(e)=>{
    var reader=new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      console.log(reader.result)
    }
    reader.onerror=(error)=>{
      console.log(error)
    }
    //edit this
  }
  return (
    <div className="py-10 md:px-20 px-10 flex  flex-col gap-10 items-center">
      <h2 className="sub-header-text">Create a Post</h2>
      <form action="" className="flex md:flex-row flex-col gap-10 items-center justify-center">
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
            <input type="checkbox" value="Watermark?" />
            <label htmlFor="">Watermark?</label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg text-white">
        <div className='flex-1 flex flex-col items-center justify-center glassmorphism rounded-xl md:px-10 px-2 py-5'>
        <input 
        type="file"
        id="file-upload"
        accept='image/*'
        onChange={convertToBase64}
        />
        <label htmlFor="file-upload" className='py-10 text-xl'>Upload a File</label>
      </div>
        </div>
      </form>
      <button type="submit"
      onClick={handleSubmit}
      >Submit</button>
    </div>
  );
};

export default CreatePost;

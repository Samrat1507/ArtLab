import React, {useState} from "react";
import cube from "../assets/cube.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = new useNavigate();
  const [err, seterr] = useState('')
  const [details, setDetails] = useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setDetails({...details,[name]:value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch('http://localhost:5000/user/login',{
      method:'POST',
      body:JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    const data= await response.json()
    if(data.user){
      // alert("success")
      sessionStorage.setItem("userToken",data.user)
      nav('/feed')
    }
    else{
      alert("F in chat")
    }
  }
  return (
    <div className="flex items-center justify-center pt-20 h-screen w-full relative">
      <img
        src={cube}
        alt=""
        className="h-48 w-36 absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          nav("/");
        }}
      />
      <div className="px-10 py-10 card rounded-lg">
        <form action="" className="flex flex-col gap-5 w-fit items-center">
          <label htmlFor="" className="sub-header-text pb-5">
            Log In
          </label>
          <input
            type="text"
            placeholder="Your Email"
            className="py-2 rounded-lg active:border-none px-10 outline-none"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="You Password"
            className="py-2 rounded-lg active:border-none px-10 outline-none"
            name="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
            onClick={handleSubmit}
          >
            Log In
          </button>
          <div>
          <label htmlFor="" className="text-white">Not a user? </label>
          <label onClick={()=>{nav('/signup')}} className="text-yellow-200 cursor-pointer">Sign up</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

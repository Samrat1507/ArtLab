import React,{useState} from "react";
import cube from "../assets/cube.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [err, seterr] = useState('')
  const [details, setDetails] = useState({
    artist_name:'',
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setDetails({...details,[name]:value});
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch('http://localhost:5000/user/register',{
      method:'POST',
      body:JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    const res= await response.json()
    console.log(res)
    if(res.message==='400'){
      seterr('username or email already exists')
    }
    else{
      seterr('')
      nav('/login')
    }
  }
  const nav = new useNavigate();
  return (
    <div className="flex items-center justify-center pt-20 h-screen w-full relative">
      <img
        src={cube}
        alt="cube"
        className="h-48 w-36 absolute top-0 left-0 cursor-pointer"
        onClick={() => {
          nav("/");
        }}
      />
      <div className="px-10 py-10 card rounded-lg">
        <form className="flex flex-col gap-5 w-fit items-center">
          <label htmlFor="" className="sub-header-text pb-5">
            Sign Up
          </label>
          <input
            type="text"
            name="artist_name"
            onChange={handleChange}
            placeholder="Username"
            className="outline-none py-2 rounded-lg active:border-none px-10"
          />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Your Email"
            className="outline-none py-2 rounded-lg active:border-none px-10"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="You Password"
            className="outline-none py-2 rounded-lg active:border-none px-10"
          />
          <div className="text-white opacity-75 text-xs">{err}</div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-fit h-fit px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white"
          >
            Sign Up
          </button>
          <div>
          <label htmlFor="" className="text-white">Already a user? </label>
          <label onClick={()=>{nav('/login')}} className="text-yellow-200 cursor-pointer">Login</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

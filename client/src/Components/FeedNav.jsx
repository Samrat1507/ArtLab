import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

const Nav = ({artist_name, profile_pic}) => {
  
  const gotoo = new useNavigate();
  return (
    <div className='fixed top-0 left-0 w-full z-50 '>
      <nav className='bg-primary'>
        <ul className='flex justify-evenly px-10 py-5'>
          <Link to='/create'>
            <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Post</li>
          </Link>
          <Link to='/login'>
          <li onClick={(e)=>{
            e.preventDefault()
            sessionStorage.removeItem("userToken")
            gotoo("/");
          }} className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Logout</li>
          </Link>
          <Link to='/editprofile'>
            <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300 flex gap-5 items-center'>
              <span>{artist_name}</span>
              <img src={profile_pic!='default'?`https://artlab-3629.onrender.com/user/${profile_pic}`: 'pfp.svg'} alt="user_profile_photo" className='h-10 w-10 rounded-full'/>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <nav className='bg-primary'>
        <ul className='flex justify-evenly px-10 py-5'>
          <Link to='/create'>
            <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Post</li>
          </Link>
          <Link to='/editprofile'>
            <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Profile</li>
          </Link>
          <Link to='/login'>
          <li onClick={(e)=>{
            e.preventDefault()
            sessionStorage.removeItem("userToken")
          }} className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Logout</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
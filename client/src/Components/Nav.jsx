import React from 'react'

const Nav = () => {
  return (
    <div className='md:block hidden'>
        <nav>
            <ul className='flex justify-evenly px-10 py-5 bg-primary'>
                <a href="#about">
                <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>About</li>
                </a>
                <a href="#features">
                <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Features</li>
                </a>
                <li className='text-orange-400 text-lg cursor-pointer hover:text-orange-300'>Guidelines</li>
            </ul>
        </nav>
    </div>
  )
}

export default Nav
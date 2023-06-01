import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import starry from '../assets/starry-night.jpg'
import vincent from '../assets/vincent.jpg'

const PostCard = ({title, desc, img, artist, profile_pic}) => {
  return(
  <div className='flex flex-col w-fit h-fit bg-black rounded-lg pb-5'>
    <div className='flex flex-row gap-5 px-5 py-2 items-center'>
      <img src={profile_pic} alt="artist_profile_photo" className='rounded-full h-14 w-14' />
      <h3 className='text-white'>{artist}</h3>
    </div>
    <img src={img} alt="artwork" className='rounded-lg h-72 w-72'/>
    <div className='flex flex-row gap-10 px-5 py-2'>
      <p className='text-white cursor-pointer'>Like</p>
      <p className='text-white cursor-pointer'>Report</p>
    </div>
    <div className='flex flex-col gap-4 px-5 py-2'>
    <h2 className='text-white text-3xl'>{title}</h2>
    <p className='text-white'>{desc}</p>
    </div>
  </div>
  )
}

export const Feed = () => {
  const nav = new useNavigate();

  const [posts, setposts] = useState([
  {
    'title' : "Starry Night",
    'desc' : 'A starry night',
    'img' : starry,
    'profile_pic' : vincent,
    'artist_name' : "Vincent van Gogh",
  },
  {
    'title' : "Starry Night",
    'desc' : 'A starry night',
    'img' : starry,
    'profile_pic' : vincent,
    'artist_name' : "Vincent van Gogh",
  },
  {
    'title' : "Starry Night",
    'desc' : 'A starry night',
    'img' : starry,
    'profile_pic' : vincent,
    'artist_name' : "Vincent van Gogh",
  },

])

  useEffect(() => {
      const ftechData = async() => {
        const token = sessionStorage.getItem("userToken")
        const res = await fetch('http://localhost:5000/user/auth', {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        })
  
        const data = await res.json();
        if(data.status!=401)
          console.log(data)
        else{
          console.log(data.status)
          nav('/login')
        }
        
      }
      

      ftechData()
  }, []);

  // const getData = async() => {
  //   const token = sessionStorage.getItem("userToken")
  //   const res = await fetch('http://localhost:5000/user/feed', {
  //     method: 'GET',
  //     headers: {
  //       'x-access-token': token,
  //     },
  //   })
  // }


  return (
    <div className='flex flex-col gap-10 md:px-20 px-10 py-10'>
      <h1 className='header-text'>Feed</h1>
      <div className='grid md:grid-cols-3 gap-5 grid-cols-1'>
      {posts.map((post, index)=> (
        <PostCard title={post.title} img={post.img} profile_pic={post.profile_pic} artist={post.artist_name} desc={post.desc} key={index}/>
      ))}
      </div>
    </div>
  )
}

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from "../Components/FeedNav";

const PostCard = ({ title, desc, art_image, artist, profile_pic, _id, watermark }) => {
  console.log(art_image);
  return (
    <div className='flex flex-col w-fit h-fit bg-black rounded-lg pb-5'>
      <div className='flex flex-row gap-5 px-5 py-2 items-center'>
        <img src={profile_pic} alt="artist_profile_photo" className='rounded-full h-14 w-14' />
        <h3 className='text-white'>{artist}</h3>
      </div>
      <div className='relative'>
        <img src={`http://localhost:5000/post/${art_image}`} alt="artwork" className='rounded-lg h-72 w-72' />
        {watermark && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <p className='text-white text-3xl opacity-30'>{watermark}</p>
          </div>
        )}
      </div>
      <div className='flex flex-row gap-10 px-5 py-2'>
        <p className='text-white cursor-pointer'>Like</p>
        <p className='text-white cursor-pointer'>Report</p>
      </div>
      <div className='flex flex-col gap-4 px-5 py-2'>
        <h2 className='text-white text-3xl'>{title}</h2>
        <p className='text-white'>{desc}</p>
      </div>
    </div>
  );
};

export const Feed = () => {
  const nav = new useNavigate();
  
  const [posts, setposts] = useState([])

  const [User, setUser] = useState({
    artist_name : '',
    profile_pic : null,
  })

  const [url, seturl] = useState('')
  useEffect(() => {

    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/post/feed');
      setposts(response.data)
    };
      const ftechData = async() => {
        const token = sessionStorage.getItem("userToken")
        const res = await fetch('http://localhost:5000/user/auth', {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        })
  
        const data = await res.json();
        if(data.status!=401){
          
        }
        else{
          nav('/login')
        }
        
      }

      ftechData();
      fetchPosts();
    }, []);
    
    const geturl = async(path) => {
      const response = await axios.get(`http://localhost:5000/post/${path}`);
      seturl(response.data);
    }

    console.log(posts)

  return (
    <div>
      <Nav/>
    <div className=' pt-20 flex flex-col gap-10 md:px-20 px-10 py-10'>
      <h1 className='header-text'>Feed</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1'>
      {posts.map((post, index)=> (
        <PostCard title={post.title} art_image={post.art_image} profile_pic={post.profile_pic} artist={post.artist_name} desc={post.description} key={index} _id={post._id}/>
      ))}
      </div>
    </div>
    </div>
  )
}

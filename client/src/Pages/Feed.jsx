import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from "../Components/FeedNav";

const PostCard = ({ title, desc, art_image, artist, upvotes, amt }) => {
  const [watermark, setwatermark] = useState(null)
  const [profilephoto, setprofilephoto] = useState(null)
  const [Liked, setLiked] = useState(false)
  useEffect(()=> {
    const getPictures = async () => {
      const response = await fetch('http://localhost:5000/user/findUser', {
        method: 'POST',
        body: JSON.stringify({
          artist_name: artist,
        })
      })

      const data = await response.json();
      setwatermark(data.watermark_photo || 'default')
      setprofilephoto(data.profile_photo || 'default')
    } 

    getPictures();
  }, [])

  const toggleLike = () => {
    setLiked(!Liked)
  }
  return (
    <div className='flex flex-col w-fit h-fit bg-gradient-to-tr from-[#7a4534] to-[#65173d] rounded-lg pb-5'>
      <div className='flex flex-row gap-5 px-5 py-2 items-center'>
        <img src={profilephoto!='default' ? `http://localhost:5000/post/${profilephoto}` : 'pfp.svg'} alt="artist_profile_photo" className='rounded-full h-10 w-10' />
        <h3 className='text-white'>{artist}</h3>
      </div>
      <div className='relative'>
        <img src={`http://localhost:5000/post/${art_image}`} alt="artwork" className='rounded-lg h-72 w-72 object-fit px-2' />
        <img src={watermark!='default'? `http://localhost:5000/post/${watermark}` : "cube.png"} alt="watermark" className='absolute top-0 opacity-30 left-0' />
      </div>
      <div className='flex flex-row justify-between px-5 py-2'>
        <div className='flex gap-1 items-center'>
          <img src={Liked? 'liked.svg': 'unliked.svg'} alt="like" className='h-5 w-5 cursor-pointer' onClick={toggleLike}/>
        <p className='text-white cursor-pointer'>{upvotes}</p>
        </div>
        <div className='flex gap-1 items-center'>
        <p className='text-white cursor-pointer text-xs'>Not original?</p>
        <img src="report.svg" alt="report" className='h-5 w-5'/>
        </div>
      </div>
      <div className='flex flex-col gap-4 px-5 py-2'>
        <h2 className='text-white text-3xl font-bold'>{title}</h2>
        <p className='text-white'>{desc}</p>
      </div>
      <div className='px-5'>
        <p className='text-slate-400 text-xs'>Rs. {amt}</p>
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
          setUser({...User, 
            artist_name: data.artist_name,
            profile_pic: data.profile_photo || profile_pic,
          })
        }
        else{
          nav('/login')
        }
        
      }

      ftechData();
      fetchPosts();
    }, []);

  return (
    <div>
      <Nav artist_name={User.artist_name} profile_pic={User.profile_pic || 'default'}/>
    <div className=' pt-20 flex flex-col gap-10 md:px-20 px-10 py-10'>
      <h1 className='header-text'>Feed</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1'>
      {posts.map((post, index)=> (
        <PostCard title={post.title} amt={post.amt} art_image={post.art_image} artist={post.artist_name} desc={post.description} key={index} _id={post._id} upvotes={post.upvote}/>
      ))}
      </div>
    </div>
    </div>
  )
}

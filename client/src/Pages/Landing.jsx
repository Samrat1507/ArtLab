import React, { useState } from "react";
import cube from "../assets/cube.png"
import { Tilt } from "react-tilt";
import { useNavigate } from "react-router-dom";
import StarsCanvas from "../Components/Stars";
import { about1, about2, about3, about4 } from '../assets'
import Nav from "../Components/Nav";
import Feature from "../Components/Feature";
import feature1 from "../assets/feature1.jpg"
import feature2 from "../assets/feature2.jpg"
import feature3 from "../assets/feature3.jpg"
import law from "../assets/law.svg"
import bulb from "../assets/bulb.svg"
import report from "../assets/report.svg"
import shield from "../assets/shield.svg"

const Card = ({img}) => {
  return (
    <div className="rounded-lg">
    <Tilt>
      <img src={img} alt="guideline" className="h-48 w-48 rounded-xl"/>
    </Tilt>
    </div>
  )
}

const GuideCard = ({img, text, title}) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className='w-64 h-96 bg-gradient-to-tr from-[#FA8E6D] to-[#D53380] flex flex-col items-center justify-center py-10 rounded-xl text-white' onMouseEnter={handleCardFlip} onMouseLeave={handleCardFlip}>
      <div className={`${flipped ? 'block' : 'hidden'} px-10 py-2`}>
          <p>
            {text}
          </p>
      </div>

      <div className={`${flipped ? 'hidden': 'block'} flex flex-col items-center justify-center gap-5`}>
          <img src={img} alt="guide" className="h-20 w-20"/>
          <h3 className="text-white">{title}</h3>
      </div>
      
    </div>
  )
}

const Landing = () => {
  const nav = new useNavigate()
  const imgarr = [about1, about2, about3, about4];
  const guides = [
    {
      'title': 'Embrace originality',
      'text' : 'ArtLab strictly prohibits plagiarism, ensuring a space where artists can showcase their unique creations and foster a culture of creativity and authenticity.',
      'img' : bulb,
    },
    {
      'title': 'Uphold integrity',
      'text' : " If you wish to use someone's artwork, we encourage you to reach out and collaborate with the artist directly. Connect, communicate, and obtain the necessary permissions to ensure a respectful and mutually beneficial relationship.",
      'img' : report,
    },
    {
      'title': "Respect artists' rights",
      'text' : 'ArtLab strictly prohibits plagiarism, ensuring a space where artists can showcase their unique creations and foster a culture of creativity and authenticity.',
      'img' : law,
    },
    {
      'title': 'Platform boundaries',
      'text' : ' While ArtLab provides a thriving community for artists, we cannot assume responsibility for external communications or transactions. Please exercise caution and discretion when engaging in activities beyond the platform.',
      'img' : shield,
    },
  ]
  return (
    <div>
    <Nav/>
    <div className="flex md:flex-row flex-col md:px-20 px-10 md:text-start text-center items-center md:justify-between justify-center h-screen">
      <div className="flex flex-col justify-center items-start gap-10 h-fit w-fit">
        <h1 className="header-text text-bold">Art Lab</h1>
        <h1 className="h3-header-text text-bold">Unleash your imagination</h1>
        <div className="flex gap-10 md:items-start items-center justify-center">
        <button className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white" onClick={()=>{nav('/login')}}>Log In</button>
        <button className="w-fit h-fit text-xs md:text-lg px-10 py-2 rounded-xl bg-gradient-to-b from-[#FA8E6F] to-[#D93382] hover:bg-gradient-to-t text-white" onClick={()=>{nav('/signup')}}>Sign Up</button>
        </div>
      </div>
      <img src={cube} alt="" />
      <StarsCanvas />
    </div>
      <div className="px-20 flex flex-col gap-8 pt-14 pb-5" id="about">
        <h2 className="sub-header-text">About Art Lab</h2>
        <p className="text-[#F6B5A2] text-md font-thin max-w-3xl">Introducing <strong>ArtLab</strong>: The ultimate online haven for artists! Our platform is designed exclusively for the artistic community, offering a space to showcase, connect, and inspire. Share your artwork, engage with fellow artists, and immerse yourself in a supportive creative environment. Welcome to ArtLab, where artists thrive! </p>
        <div className="flex gap-10 md:flex-row flex-col">
        {imgarr.map((img, index)=> (
          <Card img={img} key={index}/>
        ))}
        </div>
      </div>

      <div id="features" className="px-20 pt-20 flex flex-col gap-8 pb-10">
          <h2 className="sub-header-text">Features</h2>
          <p className="text-[#F6B5A2] text-md font-thin max-w-3xl">Discover the endless possibilities of ArtLab's innovative features. From seamless artwork uploads to engaging social interactions, our platform empowers artists to showcase their talent, connect with a vibrant community, and unlock new opportunities for creative growth.</p>
          <Feature name={"Share your Artwork"} desc={"We aim to create an artist friendly platform for you to share and show off your creativity with no worries about it getting stolen or plagiarized."} img={feature1} alignment={'left'}/>
          <Feature name={"Follow your Favourites"} desc={"You can now stay up to date with the works of your favourite artists."} img={feature2} alignment={'right'}/>
          <Feature name={"Create a Portfolio"} desc={"If you are an artist or a graphic designer trying to get notices, Art Lab is the place for you. "} img={feature3} alignment={'left'}/>
      </div>

      <div id="guidelines" className="px-20 pt-20 flex flex-col gap-8 pb-10">
        <h2 className="sub-header-text">Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-5">
          {guides.map((guide) => (
            <GuideCard title={guide.title} img={guide.img} text={guide.text} key={guide.title}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

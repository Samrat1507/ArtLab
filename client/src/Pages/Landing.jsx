import React from "react";
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

const Card = ({img}) => {
  return (
    <div className="rounded-lg">
    <Tilt>
      <img src={img} alt="" className="h-48 w-48 rounded-xl"/>
    </Tilt>
    </div>
  )
}

const Landing = () => {
  const nav = new useNavigate()
  const imgarr = [about1, about2, about3, about4];
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
        <p className="text-[#F6B5A2] text-md font-thin max-w-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quas officiis. Quaerat veniam amet iure. Ad fugit commodi quod inventore. Tenetur tempora suscipit numquam sint corrupti nulla veritatis, a deserunt. </p>
        <div className="flex gap-10 md:flex-row flex-col">
        {imgarr.map((img, index)=> (
          <Card img={img} key={index}/>
        ))}
        </div>
      </div>

      <div id="features" className="px-20 pt-20 flex flex-col gap-8 pb-10">
          <h2 className="sub-header-text">Features</h2>
          <p className="text-[#F6B5A2] text-md font-thin max-w-3xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit, optio, praesentium quod dolore numquam quas pariatur, sunt nemo neque dolores! Impedit iusto corrupti earum inventore necessitatibus, quas ducimus eveniet?</p>
          <Feature name={"Share your Artwork"} desc={"We aim to create an artist friendly platform for you to share and show off your creativity with no worries about it getting stolen or plagiarized."} img={feature1} alignment={'left'}/>
          <Feature name={"Follow your Favourites"} desc={"You can now stay up to date with the works of your favourite artists."} img={feature2} alignment={'right'}/>
          <Feature name={"Create a Portfolio"} desc={"If you are an artist or a graphic designer trying to get notices, Art Lab is the place for you. "} img={feature3} alignment={'left'}/>
      </div>
    </div>
  );
};

export default Landing;

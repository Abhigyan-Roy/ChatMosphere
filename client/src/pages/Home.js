import React from 'react'
import videoBg from '../assets/talk.mp4';
import { useNavigate, Link } from "react-router-dom";
import '../assets/home.css'
function Home() {
  return (
    <div className='main'>
      <div className="overlay"></div>
      <video src={videoBg} autoPlay loop muted />
      <div className="content">
        <header>
          <div className="nav-bar">
            <a href="" className="logo">CHATMOSPHERE</a>
            <div className="navigation">
              <div className="nav-items">
                <i className="uil uil-times nav-close-btn"></i>
                <a href="#"><i className="uil uil-home"></i> Home</a>
                <a href="#"><i className="uil uil-compass"></i> Explore</a>
                <a href="#"><i className="uil uil-info-circle"></i> About</a>
                <a href="#"><i className="uil uil-document-layout-left"></i> Blog</a>
                <a href="#"><i className="uil uil-envelope"></i> Contact</a>
              </div>
            </div>
            <i className="uil uil-apps nav-menu-btn"></i>
          </div>
        </header>
        <main>
          <h1 className='text-red-300 text-4xl'>Welcome to Chatmosphere</h1>
          <h1 className='text-red-100 text-xl mt-2'>"Where conversations take flight in a vibrant virtual atmosphere, connecting minds across the digital horizon."</h1>
          <Link to="/register"><button class="btn btn1 font-Belanosima mt-8">Let's get Started Today</button></Link>
        </main>
      </div>
    </div>
  )
}

export default Home;
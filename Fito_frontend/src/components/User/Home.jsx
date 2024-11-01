import Home1 from './user_img/Home1.png'
import { useState } from 'react';
import Footer from "../Layout/Footer"
import Navbar from "../Layout/Navbar"

const Home = () => {
  const [message, setMessage] = useState('');
  return (
    <>
      <Navbar />
      <div className='text-black'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-left flex flex-col justify-center relative'>
          <h5 className='font-extrabold font-archive text-5xl mt-40 -ml-60'>
            BUILD A PERFECT <br /> HEALTH GROWTH
          </h5>
          <p className='mt-5 -ml-60'>
            Duls aute irure dolor in reprehenderit voluptate velit <br /> esse cillum dolore eu fugiar nulla pariatur.
          </p>
          <button className='bg-[#bde800] w-[200px] font-extrabold py-3 text-white mt-4 -ml-60'>
            Get Started
          </button>

          {/* Display user message */}
          {message && (
            <div className="form-signin mt-5 text-center">
              <h3>Hi {message}</h3>
            </div>
          )}

          {/* Green square box */}
          <div className='bg-[#bde800] w-[800px] h-[423px] absolute top-80 -right-96'>
            <img
              src={Home1}
              alt='top-image'
              className='absolute -mt-60 left-[10%] transform -translate-x-3/4'
              style={{ width: '400px', height: 'auto' }} 
            />
            <h5 className='font-extrabold font-archive text-3xl mt-20 ml-80'>
              Stay Healthy by Being Active
            </h5>
            <p className='font-medium font-archive text-xl mt-5 ml-80 text-[#2c342d]'>
              Habitant morbi tristique senectus <br />
              et netus. Morbi enim nunc faucibus <br />
              a pellentesque sit. Sit amet dictum <br />
              sit amet justo donec.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
    
  )
}

export default Home
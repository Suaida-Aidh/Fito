import Home1 from './user_img/Home1.png';
import { useState } from 'react';
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

const Home = () => {
  const [message, setMessage] = useState('');

  return (
    <>
      <Navbar />
      <div className='text-black'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-left flex flex-col justify-center relative'>
          <h5 className='font-extrabold font-archive text-5xl mt-0 -ml-60'>
            BUILD A PERFECT <br /> HEALTH GROWTH
          </h5>
          <p className='mt-1 -ml-60'>
            Duls aute irure dolor in reprehenderit voluptate velit <br /> esse cillum dolore eu fugiar nulla pariatur.
          </p>
          <button className='bg-[#bde800] w-[200px] font-extrabold py-3 text-white mt-1 -ml-60'>
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

          {/* Transparent grey card below the trainer image */}
          <div className="absolute left-0 top-[calc(80%)] bg-[#D9D9D9] bg-opacity-50 w-[700px] h-[140px] flex p-6 -ml-60 justify-between items-center">
            <div className="flex-1 text-center">
              <h1 className="text-[#bde800] text-8xl font-bold opacity-70">4</h1>
              <p className="text-[#2c342d] text-[16px] font-semibold font-redhat">CERTIFICATE <br />
              TRAINER</p>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-[#bde800] text-8xl font-bold opacity-70">9</h1>
              <p className="text-[#2c342d] text-[16px] font-semibold font-redhat">YEARS <br /> EXPERIENCE</p>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-[#bde800] text-8xl font-bold opacity-70">6</h1>
              <p className="text-[#2c342d] text-[16px] font-semibold font-redhat">LOYAL <br /> CLIENT</p>
            </div>
          </div>
        </div>

        {/* Benefit Section with increased bottom margin and more horizontal margin */}
        <div className="mt-12 text-center mb-20 mx-12">
          <h2 className="font-extrabold text-4xl mb-8">BENEFIT OF OUR TRAINING</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mt-12">
            {/* Square Boxes with white background and shadow for left, right, and down only */}
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="bg-white shadow-lg shadow-[rgba(0,0,0,0.2)] p-6 text-center h-[250px] flex flex-col relative">
                {/* Bracket background */}
                <div className="absolute left-16 top-12 w-60 h-11 bg-[#ffffff] -translate-x-1/2 -translate-y-1/2 border-b-2 border-r-2 border-[#bde800]">
                  <h3 className="text-xl font-bold relative z-10">Nutrition Strategies</h3>
                </div>
                {/* Additional content in the card */}
                <p className="mt-20 text-[#4C4C4C] text-[16px] font-regular font-RedHatDisplay">
                  Nulla aliquet enim tortor at auctor urna. Neque sodales ut etiam sit amet nisl purus.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  
  // Accessing authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black relative z-50'>
      <div className="relative inline-block mb-4 p-4">
        <span className="text-4xl font-bold relative z-10">FITO</span>
        <span className="absolute inset-x-0 bottom-0 h-5 bg-[#bde800] z-0" />
      </div>
      <ul className='hidden md:flex'>
        <li className='p-4'><Link to='/' className='cursor-pointer'>Home</Link></li>
        <li className='p-4 relative'>
          <div onClick={handleDropdown} className='flex items-center cursor-pointer'>
            Trainers <FaAngleDown className={`ml-1 transition-transform ${dropdown ? 'rotate-180' : ''}`} />
          </div>
          {dropdown && (
            <ul className='absolute left-0 mt-2 w-[150px] bg-white shadow-lg z-10'>
              <li className='p-2 hover:bg-gray-200'><Link to='/trainersList' className='cursor-pointer'>All Trainers</Link></li>
              <li className='p-2 hover:bg-gray-200'><Link to='/personal-trainer' className='cursor-pointer'>Personal Trainer</Link></li>
            </ul>
          )}
        </li>
        <li className='p-4'><Link to='/userSubscription' className='cursor-pointer'>Subscription</Link></li>
        <li className='p-4'><Link to='/Contact' className='cursor-pointer'>Contact</Link></li>
        {isAuthenticated ? (
          <li className='p-4 text-black'><Logout /></li> // Change to text-black
        ) : (
          <li className='p-4'><Link to='/login' className='cursor-pointer text-black'>Login</Link></li> // Ensure Login is also black
        )}
      </ul>
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <li className='p-4 border-b border-gray-600 text-white'><Link to='/' className='cursor-pointer'>Home</Link></li>
        <li className='p-4 border-b border-gray-600 text-white'>
          <div onClick={handleDropdown} className='flex items-center cursor-pointer'>
            Trainers <FaAngleDown className={`ml-1 transition-transform ${dropdown ? 'rotate-180' : ''}`} />
          </div>
          {dropdown && (
            <ul className='absolute left-0 mt-2 w-[150px] bg-gray-800 shadow-lg z-10'>
              <li className='p-2 hover:bg-gray-700'><Link to='/Trainers' className='cursor-pointer'>All Trainers</Link></li>
              <li className='p-2 hover:bg-gray-700'><Link to='/personal-trainer' className='cursor-pointer'>Personal Trainer</Link></li>
            </ul>
          )}
        </li>
        <li className='p-4 border-b border-gray-600 text-white'><Link to='/Subscription' className='cursor-pointer'>Subscription</Link></li>
        <li className='p-4 text-white'><Link to='/Contact' className='cursor-pointer'>Contact</Link></li>
        {isAuthenticated ? (
          <li className='p-4 text-black'><Logout /></li> // Change to text-black
        ) : (
          <li className='p-4 text-white'><Link to='/login' className='cursor-pointer'>Login</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

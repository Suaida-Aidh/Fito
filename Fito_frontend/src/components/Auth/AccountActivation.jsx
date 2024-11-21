import { useNavigate } from 'react-router-dom';

const AccountActivation = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login'); // Replace '/login' with your actual login route
  };

  return (
    <div className="h-screen w-screen bg-gray-00 flex items-center justify-center">
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <div className="w-96 h-64 bg-[#bde800]"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg h-96 p-8 shadow-lg"> {/* Increased height to h-96 */}
  <div>
    <h4 className='text-center font-extrabold font-archive text-4xl '>
      Your account has been activated successfully. Go and login now.<br />
    </h4>
  </div>
  <label
    htmlFor="choose-me"
    onClick={handleLoginClick}
    className="select-none cursor-pointer rounded-lg border-2 border-white py-3 px-6 font-bold text-white bg-black transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200"
  >
    Login
  </label>
</div>

    </div>
  );
};

export default AccountActivation;

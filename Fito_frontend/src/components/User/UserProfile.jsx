import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/userSlice'; // Adjust path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section className="pt-4 bg-blueGray-50 relative">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <div className="w-96 h-64 bg-[#bde800]"></div>
        </div>

        <div className="w-full lg:w-8/12 px-4 mx-auto relative">
          <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-50 backdrop-blur-lg w-full mb-6 shadow-xl rounded-lg mt-4 border border-black">
            <div className="px-6">
              <h3 className="font-extrabold font-archive text-5xl mt-10 text-center">
                YOUR PROFILE
              </h3>
              
              <div className="flex flex-col items-center mt-4">
                <div className="relative">
                  <i className="fas fa-user text-blueGray-400 shadow-xl rounded-full border-none text-6xl h-32 w-32 flex items-center justify-center" />
                </div>

                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : profile ? (
                  <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {profile.username}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {profile.email|| 'Location not set'}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      {profile.position || 'Position not set'}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      {profile.institution || 'Institution not set'}
                    </div>
                  </div>
                ) : (
                  <p>No user data available</p>
                )}
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <a href="#" className="font-normal text-pink-500">
                      Edit Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserProfile;

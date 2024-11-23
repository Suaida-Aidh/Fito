import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubscriptions } from '../../redux/slices/subscriptionSlice';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Trainers1 from './user_img/Trainers1.svg';
import Price from './user_img/Price.svg';
import { useNavigate } from 'react-router-dom';


const UserSubscriptionList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { userSubscriptions, loading, error } = useSelector((state) => state.subscriptions);

    useEffect(() => {
        dispatch(fetchUserSubscriptions());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleManagePlan = (subscription) => {
        navigate('/checkout', { state: { subscription } });
    };

    return (
        <>
            <Navbar />
            <div className='text-black'>
                <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-left flex flex-col justify-center relative -top-10 -mb-10'>
                    <h5 className='font-extrabold font-archive text-5xl mt-40 -ml-60'>
                        START YOUR BODY <br />
                        GOAL FROM CHOOSING <br />
                        OUR PACKAGE.
                    </h5>
                    <p className='mt-5 -ml-60'>
                        Here are the plans you are currently subscribed to.
                    </p>
                    <div className='bg-[#bde800] w-[700px] h-[250px] absolute top-60 -right-96'></div>
                    <div className='bg-[#ffffff] w-[250px] h-[250px] absolute top-40 right-24'></div>
                    <img src={Trainers1} alt="Trainers Icon" className='absolute w-[200px] h-auto top-96 -right-44' />
                    <img src={Price} alt="Price Icon" className='absolute w-[200px] h-auto top-40 right-28' />
                </div>
            </div>

            {/* Subscription Cards Section */}
            <div className='max-w-7xl mx-auto -mt-40 py-10'>
                <h2 className='text-center text-4xl font-extrabold font-archive mb-8'>YOUR ACTIVE PLANS</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0'>
                    {userSubscriptions.map((subscription) => (
                        <div key={subscription.id} className='bg-white shadow-lg rounded-lg p-8'>
                            <h3 className='text-2xl font-bold mb-4'>{subscription.name}</h3>
                            <p className='text-gray-600 mb-4'>{subscription.description}</p>
                            <p className='text-4xl font-bold mb-4'>${subscription.price}/mo</p>
                            <ul className='text-gray-600 mb-6'>
                                <li>✔ Access to gym equipment</li>
                                <li>✔ Personal training sessions</li>
                                <li>✔ Access to fitness app</li>
                                {/* Add other features as necessary */}
                            </ul>
                            <button
                                onClick={() => handleManagePlan(subscription)} // Handle button click
                                className='bg-[#bde800] text-white font-bold py-2 px-4 rounded w-full'
                            >
                                Manage Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default UserSubscriptionList;
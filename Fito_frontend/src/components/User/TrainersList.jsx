import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../../redux/slices/trainerSlice';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Trainers1 from './user_img/Trainers1.svg';
import TrainerImage from './user_img/TrainerImage2.png'
const TrainersList = () => {
    const dispatch = useDispatch();
    const { trainers, loading, error } = useSelector((state) => state.trainers);

    useEffect(() => {
        dispatch(fetchTrainers());
    }, [dispatch]);

    if (loading) return <p>Loading trainers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div className='text-black'>
                <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-left flex flex-col justify-center relative -top-10 -mb-24'>
                    <h5 className='font-extrabold font-archive text-5xl mt-40 -ml-60'>
                        A TEAM WITH REMARKABLE <br /> CREDENTIALS DESPITE <br /> ITS SIZE
                    </h5>
                    <p className='mt-5 -ml-60'>
                        Duls aute irure dolor in reprehenderit voluptate velit <br /> esse cillum dolore eu fugiar nulla pariatur.
                    </p>
                    <div className='bg-[#bde800] w-[700px] h-[250px] absolute top-96 -right-96'></div>
                    <img src={Trainers1} alt="Trainers Icon" className='absolute w-[300px] h-auto top-40 -right-44' />
                </div>

                {/* New section for Trainer images */}
                <div className='max-w-[1200px] mx-auto mb-28'>
                <h2 className='text-center text-4xl font-extrabold font-archive mb-8'>OUR TRAINERS</h2>
                    <div className='flex justify-around'>
                        {trainers.map((trainer) => (
                            <div key={trainer.id} className='w-[300px] text-center'>
                                <img src={trainer.image || TrainerImage} alt={`Trainer ${trainer.username}`} className='w-full h-auto mb-2' />
                                <h3 className='font-semibold'>{trainer.username}</h3>
                                <p className='text-gray-600'>{trainer.bio || 'No bio available'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TrainersList;

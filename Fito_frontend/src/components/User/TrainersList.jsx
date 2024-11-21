import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../../redux/slices/trainerSlice';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Trainers1 from './user_img/Trainers1.svg';
import TrainerImage from './user_img/TrainerImage2.png';

const TrainersList = () => {
    const dispatch = useDispatch();
    const { trainers, loading, error } = useSelector((state) => state.trainers);

    const [currentPage, setCurrentPage] = useState(1);
    const trainersPerPage = 6; 

    useEffect(() => {
        dispatch(fetchTrainers());
    }, [dispatch]);

    if (loading) return <p>Loading trainers...</p>;
    if (error) return <p>Error: {error}</p>;

    // Calculate total pages
    const totalPages = Math.ceil(trainers.length / trainersPerPage);
    
    // Get the trainers to display for the current page
    const indexOfLastTrainer = currentPage * trainersPerPage;
    const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
    const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

                {/* Trainers Section */}
                <div className='max-w-[1200px] mx-auto mb-28'>
                    <h2 className='text-center text-4xl font-extrabold font-archive mb-8'>OUR TRAINERS</h2>
                    <div className='flex flex-wrap justify-center mt-20'>
                        {currentTrainers.map((trainer) => (
                            <div key={trainer.id} className='w-[300px] h-[400px] text-center mb-16 mx-10 flex flex-col items-center'> {/* Fixed width and height */}
                                <img src={trainer.image || TrainerImage} alt={`Trainer ${trainer.username}`} className='w-full h-auto mb-2' />
                                <h3 className='font-semibold'>{trainer.username}</h3>
                                <p className='text-gray-600'>{trainer.bio || 'No bio available'}</p>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className='flex justify-center mt-4'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`mx-2 px-4 py-2 rounded ${
                                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TrainersList;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../../redux/slices/trainerSlice';
import { useNavigate } from 'react-router-dom';
import AddTrainer from './AddTrainer'; // Import AddTrainer component

const TrainerMgmt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { trainers, loading, error } = useSelector((state) => state.trainers);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
    const trainersPerPage = 8;

    useEffect(() => {
        dispatch(fetchTrainers());
    }, [dispatch]);

    const handleTrainerClick = (trainerId) => {
        navigate(`/trainers/${trainerId}`);
    };

    const handleAddTrainerClick = () => {
        setShowAddTrainerModal(true);
    };

    const handleCloseModal = () => {
        setShowAddTrainerModal(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastTrainer = currentPage * trainersPerPage;
    const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
    const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);
    const totalPages = Math.ceil(trainers.length / trainersPerPage);

    if (loading) return <div>Loading trainers...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex relative">
            <div className="flex-1">
                <div className="w-full max-w-7xl mx-auto p-4">
                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={handleAddTrainerClick}
                            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
                        >
                            Add Trainer
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                        {currentTrainers.length > 0 ? (
                            currentTrainers.map((trainer) => (
                                <div
                                    key={trainer.id}
                                    onClick={() => handleTrainerClick(trainer.id)}
                                    className="bg-white rounded-lg shadow-md p-6 flex flex-col border-2 border-black cursor-pointer"
                                >
                                    <div className="flex items-center mb-4">
                                        <img 
                                            src={trainer.image || 'default-image-url'}
                                            alt={`${trainer.username}'s avatar`}
                                            className="w-16 h-16 rounded-full mr-4"
                                        />
                                        <h3 className="text-xl font-semibold">{trainer.username}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{trainer.email}</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Status: {trainer.is_active ? 'Active' : 'Inactive'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center text-gray-500">No trainers available</div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 mx-1 rounded-md ${
                                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {showAddTrainerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-gray-700 font-bold text-xl"
                        >
                            &times;
                        </button>
                        <AddTrainer onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerMgmt;

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrainer, editTrainer } from '../../redux/slices/trainerSlice'; // Adjust the path as necessary
import { useState } from 'react';

const TrainerDetail = () => {
    const { trainerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const trainers = useSelector((state) => state.trainers.trainers);
    const trainer = trainers.find((t) => t.id === Number(trainerId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(trainer.username);
    const [email, setEmail] = useState(trainer.email);
    const [isActive, setIsActive] = useState(trainer.is_active);
    const [image, setImage] = useState(null);

    if (!trainer) {
        return <div>Trainer not found</div>;
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('is_active', isActive);
        if (image) {
            formData.append('image', image);
        }
        dispatch(editTrainer({ id: trainer.id, trainerData: formData }));
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(removeTrainer(trainer.id));
        navigate('/trainers'); // Adjust the path to your trainers list
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button onClick={() => navigate(-1)} className="text-blue-500">Back</button>
            <div className="bg-white rounded-lg shadow-md p-6 w-64 border-2 border-black">
                <img 
                    src={trainer.image || 'default-image-url'} 
                    alt={`${trainer.username}'s avatar`} 
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold text-center">{trainer.username}</h3>
                <p className="text-gray-600 text-center">{trainer.email}</p>
                <p className="text-sm text-gray-500 text-center mb-4">Status: {trainer.is_active ? 'Active' : 'Inactive'}</p>
                <div className="flex justify-between">
                    <button onClick={() => setIsModalOpen(true)} className="text-blue-500">Edit</button>
                    <button onClick={handleDelete} className="text-red-500">Delete</button>
                </div>
            </div>
            
            {/* Modal for Editing Trainer */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                        <h2 className="text-xl font-semibold mb-4">Edit Trainer</h2>
                        <form onSubmit={handleEdit}>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder="Username" 
                                className="border p-2 mb-2 w-full"
                            />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                                className="border p-2 mb-2 w-full"
                            />
                            <label className="block mb-2">
                                <input 
                                    type="checkbox" 
                                    checked={isActive} 
                                    onChange={(e) => setIsActive(e.target.checked)} 
                                />
                                Active
                            </label>
                            <input 
                                type="file" 
                                onChange={(e) => setImage(e.target.files[0])} 
                                className="border p-2 mb-2 w-full"
                            />
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-red-500">Close</button>
                                <button type="submit" className="text-blue-500">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerDetail;

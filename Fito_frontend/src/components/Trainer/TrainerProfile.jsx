import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainerProfile, updateTrainerProfileThunk } from '../../redux/slices/trainerSlice';
import Sidebar from '../Layout/Sidebar'

const TrainerProfile = () => {
    const dispatch = useDispatch();
    const trainerProfile = useSelector((state) => state.trainers.profile);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        // Add other fields as needed
    });

    useEffect(() => {
        // Assume the trainer's ID is available in the auth state or context
        const trainerId = 1; // Replace with actual ID
        dispatch(fetchTrainerProfile(trainerId)).then((action) => {
            if (action.payload) {
                setProfileData(action.payload);
            }
        });
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = () => {
        const trainerId = 1; // Replace with actual ID
        dispatch(updateTrainerProfileThunk({ id: trainerId, profileData }));
        setEditMode(false);
    };

    return (
        <div className="flex min-h-screen bg-blueGray-50">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <section className="flex-grow pt-4 relative">
                <div className="w-full lg:w-8/12 px-4 mx-auto relative">
                    <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-50 backdrop-blur-lg w-full mb-6 shadow-xl rounded-lg mt-4 border border-black">
                        <div className="px-6">
                            <h3 className="font-extrabold font-archive text-5xl mt-10 text-center">
                                YOUR PROFILE
                            </h3>
                            <div className="text-center mt-12">
                                {editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="username"
                                            value={profileData.username}
                                            onChange={handleChange}
                                            className="text-xl font-semibold leading-normal mb-2 text-blueGray-700"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                            className="text-xl font-semibold leading-normal mb-2 text-blueGray-700"
                                        />
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-pink-500 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                                            {trainerProfile?.username || profileData.username}
                                        </h3>
                                        <p className="text-blueGray-600">
                                            {trainerProfile?.email || profileData.email}
                                        </p>
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="bg-pink-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit Profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrainerProfile;

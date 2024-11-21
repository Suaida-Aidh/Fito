import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerTrainer } from '../../redux/slices/trainerSlice';

const AddTrainer = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null); // Add state for image
    const [emailSent, setEmailSent] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.trainers);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Get the selected image file
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match.");
            return;
        }

        const result = await dispatch(registerTrainer({ username, email, password, image }));
        if (registerTrainer.fulfilled.match(result)) {
            setEmailSent(true);
            onClose(); // Close the modal after successful addition
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Add Trainer</h1>
            <form onSubmit={handleRegister}>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange} // Image upload handler
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    {passwordMatchError && <p className="text-red-500 text-center">{passwordMatchError}</p>}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#6e830f] text-white rounded-md hover:bg-[#879d15]"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Trainer'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error.message || 'Email already used'}</p>}
            </form>
        </div>
    );
};

export default AddTrainer;

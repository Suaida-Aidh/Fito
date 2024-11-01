import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // Update path as needed
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match.");
            return;
        }

        const result = await dispatch(registerUser({ username, email, password }));
        
        if (registerUser.fulfilled.match(result)) {
            console.log('Registration Successful');
            setEmailSent(true);
            navigate('/login') 
        } else {
            
            console.log('Registration Failed', result.error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create your account 📝</h1>
                
                {emailSent ? (
                    <p className="text-center text-green-600 mb-4">Please check your email to verify your account before logging in.</p>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <div>
                                <input 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    type="text" 
                                    placeholder="Username"
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <input 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    type="email" 
                                    placeholder="Email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <input 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    type="password" 
                                    placeholder="Password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <input 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    type="password" 
                                    placeholder="Confirm Password"
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            {passwordMatchError && <p className="text-red-500 text-center">{passwordMatchError}</p>}
                            
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#bde800] text-white rounded-md hover:bg-[#879d15] transition duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                )}
                
                {error && <p className="text-red-500 text-center mt-4">{error.message || 'Email already used'}</p>}

                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-[#bde800] cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Log in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;

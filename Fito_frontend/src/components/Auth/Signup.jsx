import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    // Effect to handle navigation after registration
    useEffect(() => {
        if (user) {
            // Navigate to login page after successful registration
            navigate('/login'); // Change this path if your login route is different
        }
        if (error) {
            // Optionally, you can handle the error here
            console.error('Registration error:', error);
        }
    }, [user, error, navigate]);

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {error && <p className="error-message">{error.message || 'Registration failed'}</p>}
            </form>
        </div>
    );
};

export default Signup;

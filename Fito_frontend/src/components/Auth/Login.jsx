import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, isAdmin, isTrainer } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/adminDashboard', { replace: true });
      } else if (isTrainer) {
        navigate('/trainerDashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, isTrainer, navigate]); // Ensure navigate does not trigger endlessly

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Log in to your account 🔐</h1>
        
        {isLoading && <p>Loading...</p>}
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                id="email"
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
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-[#bde800] text-white rounded-md hover:bg-[#879d15] transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{"Not activated your account"}</p>}
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <span
            className="text-[#bde800] cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Go to Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

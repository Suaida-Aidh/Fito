import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated, isAdmin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    
    useEffect(()=>{
      if (isAuthenticated) {
        if (isAdmin){
          navigate('/adminDashboard', { replace: true});
        }else{
          navigate('/', { replace: true});
        }
      }
    }, [isAuthenticated, navigate, isAdmin]);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));

    };
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin} >
            <input type="email"
            placeholder="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
             />

             <input type="password"
             placeholder="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
              />

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p>{error}</p>  }
        </form>
    </div>
  )
}

export default Login
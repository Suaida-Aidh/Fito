import { useDispatch } from "react-redux"
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from "react-router-dom"


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        dispatch(logout());
        navigate('/login');
        window.location.reload();
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
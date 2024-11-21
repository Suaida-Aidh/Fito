import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserPrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserPrivateRoute;
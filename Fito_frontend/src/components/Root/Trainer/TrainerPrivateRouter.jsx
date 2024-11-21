import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const TrainerPrivateRoute = ({ children }) => {
    const token = Cookies.get('access_token'); // Get the token

    // Additional checks can be done here if needed to confirm the trainer role
    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if no token
    }

    return children; // Render child components if token exists
};

TrainerPrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TrainerPrivateRoute;

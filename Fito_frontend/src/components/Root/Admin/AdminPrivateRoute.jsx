import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types'; // Import PropTypes

const AdminPrivateRoute = ({ children }) => {
    const token = Cookies.get('access_token'); // Get the token

    // Check if the token exists
    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if no token
    }

    return children; // Render the child components if token exists
};

// PropTypes validation for AdminPrivateRoute
AdminPrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is required
};

export default AdminPrivateRoute;

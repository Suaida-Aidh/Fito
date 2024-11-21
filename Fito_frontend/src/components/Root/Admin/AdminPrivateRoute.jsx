import { useCallback } from 'react';
import { Outlet, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';

const AdminPrivateRoute = () => {
    const selector = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]);

    if (!selector.isAuthenticated || !selector.isAdmin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="bg-gray-800 text-white py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <button
                            onClick={logOut}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar and Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-200 py-4 px-3">
                    <nav className="space-y-4">
                        <Link
                            to="/adminDashboard"
                            className="block text-gray-800 hover:text-gray-900"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/usersList"
                            className="block text-gray-800 hover:text-gray-900"
                        >
                            Users
                        </Link>
                        <Link
                            to="/trainerMgmt"
                            className="block text-gray-800 hover:text-gray-900"
                        >
                            Trainers
                        </Link>
                        <Link
                            to="/Subscribed_Users"
                            className="block text-gray-800 hover:text-gray-900"
                        >
                            Subscribed Users
                        </Link>
                        <Link
                            to="/subscriptionMgmt"
                            className="block text-gray-800 hover:text-gray-900"
                        >
                            Subscription Management
                        </Link>
                        
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPrivateRoute;

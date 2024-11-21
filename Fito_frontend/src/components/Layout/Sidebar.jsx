import { Card, List, ListItem, ListItemPrefix, Chip } from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    PowerIcon
} from "@heroicons/react/24/solid";
import { FaDumbbell } from "react-icons/fa"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/slices/authSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin, isTrainer } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="w-96">
            <Card className="h-screen p-4 shadow-2xl shadow-blue-gray-900/5"> {/* Changed shadow to shadow-2xl */}
                <div className="relative inline-block mb-4 p-4">
                    <span className="text-4xl font-bold relative z-10">FITO</span>
                    <span className="absolute inset-x-0 bottom-0 h-5 bg-[#bde800] z-0 top-10 w-[90px] ml-2" />
                </div>

                <List className="space-y-8">
                    {/* Common Dashboard for Admin and Trainer */}
                    <Link to={isAdmin ? "/adminDashboard" : "/trainerDashboard"}>
                        <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <ListItemPrefix className="mr-2">
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>
                    {isAdmin && (
                        <>
                            {/* Admin-specific links */}
                            <Link to="/usersList">
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Users
                                </ListItem>
                            </Link>
                            <Link to="/trainerMgmt">
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <FaDumbbell className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Trainers
                                </ListItem>
                            </Link>
                            <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                <ListItemPrefix className="mr-2">
                                    <FontAwesomeIcon icon={faUserCheck} className="h-5 w-5 text-green-500" />
                                </ListItemPrefix>
                                Subscribed Users
                            </ListItem>
                            <Link to="/subscriptionMgmt">
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <ClipboardDocumentListIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Subscription Management
                                </ListItem>
                            </Link>
                        </>
                    )}

                    {isTrainer && (
                        <>
                            {/* Trainer-specific links */}
                            <Link to="/studentsList">
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Students
                                </ListItem>
                            </Link>
                            <Link to="/scheduledClasses">
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <ClipboardDocumentListIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Scheduled Classes
                                </ListItem>
                            </Link>

                            <Link to='/trainerProfile'>
                                <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                                    <ListItemPrefix className="mr-2">
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Profile
                                </ListItem>
                            </Link>
                        </>
                    )}

                    {/* Common Profile and Logout */}
                    <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer" onClick={handleLogout}>
                        <ListItemPrefix className="mr-2">
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </div>
    );
}

export default Sidebar;

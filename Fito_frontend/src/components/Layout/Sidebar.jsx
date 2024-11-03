import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon, 
    PowerIcon, 
} from "@heroicons/react/24/solid";
import { FaDumbbell } from "react-icons/fa"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from "react-redux";
import { logout } from '../../redux/slices/authSlice'; // Import your logout action

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="w-96">
            <Card className="h-screen p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="relative inline-block mb-4 p-4">
                    <span className="text-4xl font-bold relative z-10">FITO</span>
                    <span className="absolute inset-x-0 bottom-0 h-5 bg-[#bde800] z-0 top-10 w-[90px] ml-2" />
                </div>

                <List className="space-y-8">
                    <Link to="/AdminDashboard">
                        <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <ListItemPrefix className="mr-2">
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>

                   
                    <Link to="/usersList">
                        <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <ListItemPrefix className="mr-2">
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Users
                        </ListItem>
                    </Link>
                    <Link to="/trainerMgmt" >
                    <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <ListItemPrefix className="mr-2">
                            <FaDumbbell className="h-5 w-5" />
                        </ListItemPrefix>
                        Trainers
                        <ListItemSuffix>
                            <Chip
                                
                                size="sm"
                                variant="ghost"
                                color="blue-gray"
                                className="rounded-full"
                            />
                        </ListItemSuffix>
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
                            SubscriptionMgmt
                        </ListItem>
                    </Link>
                    <ListItem className="py-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <ListItemPrefix className="mr-2">
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
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

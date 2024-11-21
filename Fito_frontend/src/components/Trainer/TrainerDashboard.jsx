import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; 
import { SiGooglemeet } from "react-icons/si"; // Import Google Meet icon
import { MdAccountCircle } from "react-icons/md"; // Use a colorful icon for Students
import { RiWallet3Fill } from "react-icons/ri"; // Colorful wallet icon
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrainerDashboard = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <div className="p-4">
          {/* Dashboard cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Today's Assigned Classes */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <SiGooglemeet className="text-green-500 text-3xl" />
              <div>
                <p className="text-sm font-medium text-gray-600">Today’s Assigned Classes</p>
                <p className="text-lg font-bold">8</p> {/* Sample count */}
              </div>
            </div>

            {/* Students */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <MdAccountCircle className="text-blue-500 text-3xl" /> {/* Colorful student icon */}
              <div>
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-lg font-bold">56</p> {/* Sample count */}
              </div>
            </div>

            {/* Wallet */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <RiWallet3Fill className="text-purple-500 text-3xl" /> {/* Colorful wallet icon */}
              <div>
                <p className="text-sm font-medium text-gray-600">Wallet</p>
                <p className="text-lg font-bold">$1,500</p> {/* Sample wallet amount */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard;

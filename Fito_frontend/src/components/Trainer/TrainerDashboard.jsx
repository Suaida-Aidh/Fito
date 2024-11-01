
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; 
import { FaUser, FaDumbbell, FaUsers, FaDollarSign } from "react-icons/fa"; // Import icons
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const TrainerDashboard = () => {

  const monthlyData = [
    { month: "Jan", sales: 65 },
    { month: "Feb", sales: 59 },
    { month: "Mar", sales: 80 },
    { month: "Apr", sales: 81 },
    { month: "May", sales: 56 },
    { month: "Jun", sales: 55 },
    { month: "Jul", sales: 40 },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Sales: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
 

  
  return (
    
    <div className="flex">
  <Sidebar />
  <div>
  <Header />
    <div className="p-4">
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FaUser className="text-blue-500 text-3xl" />
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-lg font-bold">1,234</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FaDumbbell className="text-green-500 text-3xl" />
          <div>
            <p className="text-sm font-medium text-gray-600">Active Trainers</p>
            <p className="text-lg font-bold">56</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FaUsers className="text-purple-500 text-3xl" />
          <div>
            <p className="text-sm font-medium text-gray-600">Active Subscription Users</p>
            <p className="text-lg font-bold">150</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FaDollarSign className="text-red-500 text-3xl" />
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-lg font-bold">$12,345</p>
          </div>
        </div>
      </div>

      {/* Monthly Sales Report Graphs */}
      <h2 className="text-xl font-bold mb-4">Monthly Sales Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyData.map((data) => (
          <div key={data.month} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{data.month}</h3>
            <Bar
              data={{
                labels: [data.month],
                datasets: [
                  {
                    label: "Sales",
                    data: [data.sales],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
              options={options}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
 
)
};

export default TrainerDashboard;

import { BellIcon } from "@heroicons/react/24/outline"; // Import the notification icon

const Header = () => {
  return (
    <div>
        <div className="flex-grow">
                <div className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="text-xl font-bold">Dashboard</div>
                    <div className="relative">
                        <BellIcon className="h-6 w-6 text-gray-600" />
                        <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full"></span> {/* Notification badge */}
                    </div>
                </div>
                {/* Content Area (if needed) */}
                <div className="p-4">
                    {/* Main content goes here */}
                </div>
            </div>
    </div>
  )
}

export default Header
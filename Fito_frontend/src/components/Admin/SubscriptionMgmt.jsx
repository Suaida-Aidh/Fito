import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSubscriptions,
    addSubscription,
    editSubscription,
    removeSubscription,
} from '../../redux/slices/subscriptionSlice';
import { useEffect, useState } from 'react';

const SubscriptionMgmt = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
    const [newSubscription, setNewSubscription] = useState({ name: '', description: '', price: '', duration: '' });
    const [editSubscriptionId, setEditSubscriptionId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Pagination state
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

    useEffect(() => {
        dispatch(fetchSubscriptions());
    }, [dispatch]);

    const handleAddSubscription = () => {
        if (newSubscription.name && newSubscription.description && newSubscription.price && newSubscription.duration) {
            dispatch(addSubscription(newSubscription));
            setNewSubscription({ name: '', description: '', price: '', duration: '' });
            setIsModalOpen(false);
        }
    };

    const handleEditSubscription = (subscription) => {
        setEditMode(true);
        setEditSubscriptionId(subscription.id);
        setNewSubscription({ name: subscription.name, description: subscription.description, price: subscription.price, duration: subscription.duration });
        setIsModalOpen(true);
    };

    const handleUpdateSubscription = () => {
        if (newSubscription.name && newSubscription.description && newSubscription.price && newSubscription.duration) {
            // Passing subscriptionData as part of the action payload
            dispatch(editSubscription({ id: editSubscriptionId, subscriptionData: newSubscription }));
            setNewSubscription({ name: '', description: '', price: '', duration: '' });
            setEditMode(false);
            setEditSubscriptionId(null);
            setIsModalOpen(false);
        }
    };

    const handleDeleteSubscription = (id) => {
        dispatch(removeSubscription(id));
    };

    const paginatedSubscriptions = subscriptions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="w-full max-w-7xl mx-auto p-4">
                    <button onClick={() => { setIsModalOpen(true); setEditMode(false); }} className="bg-green-600 text-white rounded-md py-2 px-4 mb-6 hover:bg-green-700 transition duration-300">
                        Add Subscription
                    </button>
                    
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {paginatedSubscriptions.map((subscription) => (
                            <div
                                key={subscription.id}
                                className="bg-white rounded-lg shadow-md p-6 border-2 border-black flex flex-col"
                            >
                                <h3 className="text-xl font-semibold mb-4">{subscription.name}</h3>
                                <p className="text-gray-600 mb-4">{subscription.description}</p>
                                <p className="text-4xl font-bold mb-6">
                                    {subscription.price}
                                    <span className="text-xl font-normal text-gray-600">{subscription.duration}</span>
                                </p>
                                <button onClick={() => handleEditSubscription(subscription)}
                                    className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-700 transition duration-300">
                                    Edit
                                </button>
                                <br />
                                <button onClick={() => handleDeleteSubscription(subscription.id)}
                                    className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-700 transition duration-300">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 mx-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-4 py-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit Subscription' : 'Add Subscription'}</h3>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newSubscription.name}
                                    onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                                    className="border rounded mb-2 w-full p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newSubscription.description}
                                    onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
                                    className="border rounded mb-2 w-full p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={newSubscription.price}
                                    onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
                                    className="border rounded mb-2 w-full p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={newSubscription.duration}
                                    onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
                                    className="border rounded mb-2 w-full p-2"
                                />
                                <button onClick={editMode ? handleUpdateSubscription : handleAddSubscription} className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-700 transition duration-300">
                                    {editMode ? 'Update' : 'Add'}
                                </button>
                                <button onClick={() => setIsModalOpen(false)} className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-700 transition duration-300 ml-2">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionMgmt;

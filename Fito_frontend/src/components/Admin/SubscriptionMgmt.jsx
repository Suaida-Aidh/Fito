import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { fetchSubscriptions, addSubscription, editSubscription, removeSubscription } from '../../redux/slices/subscriptionSlice';

const SubscriptionMgmt = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newSubscription, setNewSubscription] = useState({
        name: '',
        price: '',
        description: '',
        duration: '',
    });
    const [editSubscriptionId, setEditSubscriptionId] = useState(null);

    const dispatch = useDispatch();
    const { subscriptions, loading, error } = useSelector((state) => state.subscriptions);

    // Fetch subscriptions when the component mounts
    useEffect(() => {
        dispatch(fetchSubscriptions());
    }, [dispatch]);

    const openModal = (subscription) => {
        if (subscription) {
            setNewSubscription({
                name: subscription.name,
                price: subscription.price,
                description: subscription.description,
                duration: subscription.duration,
            });
            setEditSubscriptionId(subscription.id);
        } else {
            setNewSubscription({
                name: '',
                price: '',
                description: '',
                duration: '',
            });
            setEditSubscriptionId(null);
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSubscriptionId) {
            dispatch(editSubscription({ id: editSubscriptionId, subscriptionData: newSubscription }));
            setEditSubscriptionId(null);
        } else {
            dispatch(addSubscription(newSubscription));
        }
        setNewSubscription({ name: '', price: '', description: '', duration: '' });
        closeModal();
    };

    const handleDelete = (id) => {
        dispatch(removeSubscription(id));
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Subscription Management</h2>
                    <button onClick={() => openModal(null)} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Create New Subscription
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subscriptions.map((subscription) => (
                            <div key={subscription.id} className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-lg font-semibold">{subscription.name}</h3>
                                <p className="text-md">Price: ${subscription.price}</p>
                                <p>Description: {subscription.description}</p>
                                <p>Duration: {subscription.duration}</p>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button className="text-blue-500" onClick={() => openModal(subscription)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="text-red-500" onClick={() => handleDelete(subscription.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                            <div className="bg-white rounded-lg p-6 w-full max-w-md z-10">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Subscription Name</label>
                                        <input
                                            type="text"
                                            value={newSubscription.name}
                                            onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                                            className="w-full border rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                        <input
                                            type="number"
                                            value={newSubscription.price}
                                            onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
                                            className="w-full border rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                        <input
                                            type="text"
                                            value={newSubscription.description}
                                            onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
                                            className="w-full border rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                                        <input
                                            type="text"
                                            value={newSubscription.duration}
                                            onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
                                            className="w-full border rounded p-2"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                                            {editSubscriptionId ? 'Update' : 'Add'} Subscription
                                        </button>
                                        <button type="button" onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionMgmt;

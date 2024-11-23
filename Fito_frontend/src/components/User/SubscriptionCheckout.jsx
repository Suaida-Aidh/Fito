import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { REACT_APP_PUBLIC_KEY } from './env';
import { server } from './server';
import api from '../../axios/api/authInstance'; // Import the api instance

const SubscriptionCheckout = () => {
    const location = useLocation();
    const { subscription } = location.state; // Pass subscription details from the previous page
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Step 1: Call backend to create Razorpay order
            const response = await api.post(`${server}/razorpay/pay/`, {
                subscription_id: subscription.id, // Pass subscription ID
            });
            const { payment, order, user_email, user_username } = response.data;

            // Step 2: Open Razorpay checkout
            const options = {
                key: REACT_APP_PUBLIC_KEY, // Razorpay public key from backend
                amount: payment.amount, // Amount in paise
                currency: payment.currency,
                name: 'Your App Name',
                description: `Subscription: ${subscription.name}`,
                order_id: payment.id, // Razorpay order ID
                handler: async function (response) {
                    // Step 3: Handle successful payment
                    const res = await api.post(`${server}/razorpay/payment/success/`, {
                        response, // Send Razorpay response to backend
                    });
                    alert(res.data.message);
                },
                prefill: {
                    name: user_username,
                    email: user_email,
                },
                theme: {
                    color: '#bde800',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error during payment', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto py-10'>
                <div className='flex justify-between'>
                    <div className='w-[25%] mt-28 ml-10'>
                        <h2 className='text-5xl font-extrabold mb-4'>CHECKOUT</h2>
                        <p className='text-xl text-gray-700'>
                            Review your subscription details and proceed to payment.
                        </p>
                    </div>
                    <div className='bg-[#C7D394] shadow-lg rounded-lg p-8 w-[45%]'>
                        <h3 className='text-3xl font-archive ml-4 mb-14 font-semibold'>Order Summary</h3>
                        <div className='flex justify-between items-center mb-20 ml-4'>
                            <span className='text-xl '>{subscription.name}</span>
                            <span className='text-xl font-bold'>${subscription.price}</span>
                        </div>
                        <hr className='my-4 border-gray-400' />
                        <div className='flex justify-between items-center mb-8 ml-4'>
                            <span className='text-xl font-bold'>Total</span>
                            <span className='text-2xl font-extrabold'>${subscription.price}</span>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className={`${
                                    loading ? 'bg-gray-400' : 'bg-[#bde800]'
                                } text-white font-bold py-3 px-7 rounded w-96`}
                            >
                                {loading ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SubscriptionCheckout;

import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [shippingAddress, setShippingAddress] = useState({});

    // Calculate prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50; // Free shipping over 500
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
        if (!savedAddress) {
            navigate('/shipping');
        } else {
            setShippingAddress(savedAddress);
        }
    }, [navigate, user]);

    const placeOrderHandler = async () => {
        try {
            await api.post('/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod: 'CashOnDelivery',
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });
            clearCart();
            alert('Order Placed Successfully! (Cash on Delivery)');
            navigate('/');
        } catch (error) {
            alert('Error placing order: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Place Order</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <CheckCircle className="text-primary" /> Shipping
                        </h2>
                        <p className="text-gray-600">
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Phone: </strong> {shippingAddress.phone}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>
                        <p className="text-gray-600">
                            <strong>Method: </strong> Cash on Delivery
                        </p>
                        <div className="mt-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                            <p className="font-bold">Pay when product is delivered</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className="divide-y">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                            <Link to={`/product/${item.product}`} className="text-gray-800 hover:text-primary font-medium">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600">
                                            {item.qty} x ₹{item.price} = <span className="font-bold text-gray-900">₹{item.qty * item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Items</span>
                            <span>₹{itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Shipping</span>
                            <span>₹{shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Tax</span>
                            <span>₹{taxPrice}</span>
                        </div>
                        <div className="flex justify-between mb-6 pb-6 border-b border-gray-200">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
                        </div>
                        <button
                            type="button"
                            className="w-full bg-primary hover:bg-green-600 text-white py-4 rounded-xl text-lg font-bold transition flex items-center justify-center gap-2"
                            onClick={placeOrderHandler}
                            disabled={cartItems.length === 0}
                        >
                            Confirm Order (COD)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;

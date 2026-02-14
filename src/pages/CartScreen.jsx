import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import CartContext from '../context/CartContext';

const CartScreen = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        // Navigate to login if not logged in, or directly to shipping/checkout
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
                    <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex items-center p-6 border-b last:border-b-0 hover:bg-gray-50 transition">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="ml-6 flex-grow">
                                        <Link to={`/product/${item.product}`} className="text-lg font-semibold text-gray-800 hover:text-primary">
                                            {item.name}
                                        </Link>
                                        <p className="text-gray-500">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => addToCart(item, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-medium w-8 text-center">{item.qty}</span>
                                        <button
                                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => addToCart(item, item.qty + 1)}
                                            disabled={item.qty >= item.countInStock}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        className="ml-6 text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCart(item.product)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Total Items</span>
                                <span className="font-semibold">{totalItems}</span>
                            </div>
                            <div className="flex justify-between mb-6 pb-6 border-b">
                                <span className="text-gray-600">Total Price</span>
                                <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-dark text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">Safe and Secure Payments. Cash on Delivery Available.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;

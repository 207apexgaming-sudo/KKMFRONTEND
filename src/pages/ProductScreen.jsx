import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import api from '../utils/api';
import CartContext from '../context/CartContext';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
                {/* Image Section */}
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-96 object-contain"
                    />
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-primary font-bold tracking-wide uppercase mb-2">{product.category}</p>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor" className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-gray-500">({product.numReviews} reviews)</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="border-t border-b py-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-700 font-medium">Status:</span>
                            <span className={product.countInStock > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border rounded-md">
                                    <button
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-4 py-1 font-medium">{qty}</span>
                                    <button
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-bold transition transform active:scale-95 ${product.countInStock > 0
                                ? 'bg-primary text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart />
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;

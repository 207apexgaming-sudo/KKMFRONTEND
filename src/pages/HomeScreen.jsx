import { useEffect, useState } from 'react';
import Product from '../components/Product';
import api from '../utils/api';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // For development/demo purposes if backend is empty, we might want dummy data, 
                // but let's try to fetch from API first.
                // If API fails or returns empty, we can show a message or fallback.
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4">
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-primary to-green-400 rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh & Fast</h1>
                    <p className="text-xl mb-6 opacity-90">Get your daily needs delivered in minutes.</p>
                    <button className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition">
                        Shop Now
                    </button>
                </div>
                <div className="absolute top-0 right-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-20"></div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Products</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error: {error}. Make sure backend is running.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;

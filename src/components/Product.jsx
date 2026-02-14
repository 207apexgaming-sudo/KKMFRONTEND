import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Product = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center"
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-primary truncate">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor" className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">{product.numReviews} reviews</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    {product.countInStock > 0 ? (
                        <span className="text-green-600 text-sm font-medium">In Stock</span>
                    ) : (
                        <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;

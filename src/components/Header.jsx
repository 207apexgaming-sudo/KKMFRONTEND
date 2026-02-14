import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    MegaMart
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-primary transition">Home</Link>
                    <Link to="/products" className="text-gray-600 hover:text-primary transition">Products</Link>

                    {user && user.isAdmin && (
                        <Link to="/admin/dashboard" className="text-gray-600 hover:text-primary transition">Admin</Link>
                    )}

                    <Link to="/cart" className="relative text-gray-600 hover:text-primary transition">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                                <User className="w-5 h-5" />
                                <span>{user.name}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block">
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                            Login
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t p-4">
                    <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/products" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Products</Link>
                    <Link to="/cart" className="block py-2 text-gray-600 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        Cart <span>({cartItems.length})</span>
                    </Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Profile</Link>
                            {user.isAdmin && (
                                <Link to="/admin/dashboard" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                            )}
                            <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left py-2 text-red-500">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="block py-2 text-primary font-bold" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;

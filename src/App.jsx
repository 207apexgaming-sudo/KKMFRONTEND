import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import ShippingScreen from './pages/ShippingScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow bg-gray-50 py-6">
                            <Routes>
                                <Route path="/" element={<HomeScreen />} />
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/register" element={<RegisterScreen />} />
                                <Route path="/product/:id" element={<ProductScreen />} />
                                <Route path="/cart" element={<CartScreen />} />
                                <Route path="/shipping" element={<ShippingScreen />} />
                                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;

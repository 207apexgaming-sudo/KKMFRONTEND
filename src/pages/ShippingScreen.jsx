import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const ShippingScreen = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country, phone }));
        navigate('/placeorder');
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Shipping Address</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input type="text" id="address" required className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                        <input type="text" id="city" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">Postal Code</label>
                        <input type="text" id="postalCode" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                        <input type="text" id="country" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                        <input type="text" id="phone" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;

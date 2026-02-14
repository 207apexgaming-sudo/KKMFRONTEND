const Footer = () => {
    return (
        <footer className="bg-dark text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} KAMTANATH MEGA MART. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Cash on Delivery Available Everywhere!</p>
            </div>
        </footer>
    );
};

export default Footer;

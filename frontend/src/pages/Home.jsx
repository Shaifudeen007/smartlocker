import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to SmartLockers
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure and smart storage solutions
        </p>
        
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <button 
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            User Login
          </button>
          <button 
            onClick={handleAdminLogin}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Admin Login
          </button>
          <button 
            onClick={handleRegister}
            className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
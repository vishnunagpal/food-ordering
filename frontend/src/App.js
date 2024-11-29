import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FoodItems from './components/FoodItems';
import Cart from './components/Cart';
import AddressForm from './components/AddressForm';
import StripeCheckout from './components/StripeCheckout';
import { CartProvider } from './CartContext';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {isLoggedIn && (
            <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
              <h1 className="text-xl font-bold">Welcome to the Food Ordering App</h1>
              <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
            </header>
          )}
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={isLoggedIn ? <Navigate to="/food" /> : <Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/food" element={isLoggedIn ? <FoodItems /> : <Navigate to="/login" />} />
              <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/address" element={isLoggedIn ? <AddressForm /> : <Navigate to="/login" />} />
              <Route path="/payment" element={isLoggedIn ? <StripeCheckout /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
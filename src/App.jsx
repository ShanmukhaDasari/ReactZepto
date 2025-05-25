import React, { useState } from 'react';
import { Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import All from './All';
import Mobiles from './Mobiles';
import BabyStore from './BabyStore';
import Electronics from './Electronics';
import Toys from './Toys';
import Nonveg from './Nonveg';
import Veg from './Veg';
import About from './AboutUs';
import ContactUs from './ContactUs';
import Cart from './Cart';
import SearchBar from './Search';
import Cafe from './Cafe';
import Orders from './Orders';
import SignIn from './SignIn';
import SignUp from './SignUp';

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logOut } from './Store';

function App() {
  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/signin');
  };

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginPrompt(true);
    }
  };

  const handleLoginClick = () => {
    setShowLoginPrompt(false);
     navigate('/signin?redirect=/cart');
    // navigate('/signin');
  };

  return (
    <>
      <title>Zepto | Shop Everything</title>

      <div className="app-container">
        {/* Header */}
        <header className="site-header">
          <div className="logo">🛍️ Siva Mart</div>
          <div className="search-login">
            <SearchBar />
            <nav>
              {isAuthenticated ? (
                <div className="user-greeting">
                  <span>Welcome, <strong>{currentUser.username}</strong></span>
                  <button onClick={handleLogout} className="logout-button">Log Out</button>
                </div>
              ) : (
                <Link to="/signin" className="nav-link">Sign In</Link>
              )}
            </nav>
            <Link
              to="/cart"
              onClick={handleCartClick}
              className="cart-link"
            >
              🛒
              {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
            </Link>
          </div>
        </header>

        {/* Navigation */}
        <nav className="navbar">
          <Link to="/">All</Link>
          <Link to="/cafe">☕ Cafe</Link>
          <Link to="/veg">🥕 Veg</Link>
          <Link to="/nonveg">🍗 Non-Veg</Link>
          <Link to="/toys">🧸 Toys</Link>
          <Link to="/electronics">🔌 Electronics</Link>
          <Link to="/babystore">👶 Baby</Link>
          <Link to="/mobiles">📱 Mobiles</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {showLoginPrompt ? (
            <div className="login-prompt-container">
              <h2 className="login-prompt-message">Please sign in to view your cart.</h2>
              <button
                onClick={handleLoginClick}
                className="login-prompt-button"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<All />} />
              <Route path="/cafe" element={<Cafe />} />
              <Route path="/veg" element={<Veg />} />
              <Route path="/nonveg" element={<Nonveg />} />
              <Route path="/toys" element={<Toys />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/mobiles" element={<Mobiles />} />
              <Route path="/babystore" element={<BabyStore />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/signin" />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          &copy; 2025 Zepto Mart. All rights reserved.
        </footer>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;

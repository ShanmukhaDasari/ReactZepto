import React from 'react';
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

// PrivateRoute component to protect private pages
function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

// PublicRoute to prevent logged-in users from visiting signin/signup
function PublicRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/all" replace />;
}

function App() {
  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
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
                <Link to="/" className="nav-link">Sign In</Link>
              )}
            </nav>
            <Link to="/cart" className="cart-link">
              🛒
              {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
            </Link>
          </div>
        </header>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="navbar">
            <Link to="/all">All</Link>
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
        )}

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />

            {/* Private routes */}
            <Route
              path="/all"
              element={
                <PrivateRoute>
                  <All />
                </PrivateRoute>
              }
            />
            <Route
              path="/cafe"
              element={
                <PrivateRoute>
                  <Cafe />
                </PrivateRoute>
              }
            />
            <Route
              path="/veg"
              element={
                <PrivateRoute>
                  <Veg />
                </PrivateRoute>
              }
            />
            <Route
              path="/nonveg"
              element={
                <PrivateRoute>
                  <Nonveg />
                </PrivateRoute>
              }
            />
            <Route
              path="/toys"
              element={
                <PrivateRoute>
                  <Toys />
                </PrivateRoute>
              }
            />
            <Route
              path="/electronics"
              element={
                <PrivateRoute>
                  <Electronics />
                </PrivateRoute>
              }
            />
            <Route
              path="/mobiles"
              element={
                <PrivateRoute>
                  <Mobiles />
                </PrivateRoute>
              }
            />
            <Route
              path="/babystore"
              element={
                <PrivateRoute>
                  <BabyStore />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <ContactUs />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/all" : "/"} />} />
          </Routes>
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

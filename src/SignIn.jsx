import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Store'; // Adjust path if needed
import { useNavigate,Link, useLocation } from 'react-router-dom';

import './SignIn.css';

function SignIn() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get users array from Redux
  const users = useSelector((state) => state.users.users);

  // Read redirect param from query string, default to '/all'
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/all';

  const onSubmit = (data) => {
    const emailInput = data.email.trim().toLowerCase();
    const passwordInput = data.password;

    // Find user matching email & password
    const existingUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() === emailInput &&
        user.password === passwordInput
    );

    if (existingUser) {
      dispatch(loginUser(existingUser));
      alert('Sign in successful!');
      // Navigate to the redirect path or /all
      navigate(redirectPath, { replace: true });
      // navigate('/all');
    } else {
      alert('Invalid email or password');
      reset(); // clear form inputs
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <h2>Sign In to Mart</h2>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} required />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <p className="new-user">
        New user? <Link to="/signup">Create new account</Link>
      </p>

    </div>
  );
}

export default SignIn;

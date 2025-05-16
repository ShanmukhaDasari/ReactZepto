import React from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { registerUser } from './Store';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { register, handleSubmit } = useForm();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert('sign in success');
    navigate('/')
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <h2>Sign In to Zepto</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p className="new-user">New user?<a href="/signup">Create new account</a></p>
    </div>
  );
}

export default SignIn;

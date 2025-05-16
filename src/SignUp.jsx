import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css'; // Create this CSS file
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './Store';

function SignUp() {
  const { register, handleSubmit } = useForm();

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert('register successful');
    navigate('/SignIn')
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Create a New Account</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username')}
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

        <div>
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                value="male"
                {...register('gender')}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...register('gender')}
              />
              Female
            </label>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

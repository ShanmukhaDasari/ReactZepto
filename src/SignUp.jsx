import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './Store';

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const users = useSelector(state => state.users.users);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    alert('Register successful');
    navigate('/');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Create a New Account</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input type="text" {...register('username')} required />
        </div>


        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')} required
          />
          {/* {errors.password && <p className="error">{errors.password.message}</p>} */}
        </div>

        <div>
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                value="male"
                {...register('gender')}required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...register('gender')} required
              />
              Female
            </label>
          </div>
          {/* {errors.gender && <p className="error">{errors.gender.message}</p>} */}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

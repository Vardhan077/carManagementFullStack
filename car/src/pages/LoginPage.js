

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { login } from '../api/authApi';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const loginStyles = css`
  font-family: 'Poppins', sans-serif;
  background: #f4f7fb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;

  form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    transition: transform 0.3s ease;
  }

  form:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  h2 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 12px;
    margin: 12px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input:focus {
    border-color: #4caf50;
    outline: none;
  }

  button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.1rem;
  }

  button:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }

  .signup-btn {
    background-color: #8360c3;
    margin-top: 1.5rem;
    color: white;
  }

  .signup-btn:hover {
    background-color: #65489c;
  }

  .forgot-password {
    display: block;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .forgot-password:hover {
    color: #4caf50;
  }
`;

const LoginPage = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response.Status === 'Success') {
        Cookies.set('token', response.token.token, { expires: 1 });
        // alert('Login successful!');
        navigate('/dashboard');
      } else if (response.Error === 'User not found') {
        alert('User not found. Please sign up.');
      } else {
        alert('Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div css={loginStyles}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
        <button type="button" className="signup-btn" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </form>
    </div>
  );
};

export default LoginPage;

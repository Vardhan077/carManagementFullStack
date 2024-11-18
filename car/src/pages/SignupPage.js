

// /** @jsxImportSource @emotion/react */
// import React, { useState } from 'react';
// import { css } from '@emotion/react';
// import { signup } from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const containerStyle = css`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     min-height: 100vh;
//     background-color: #f4f4f4;
// `;

// const formStyle = css`
//     background-color: white;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     width: 300px;
// `;

// const inputStyle = css`
//     width: 100%;
//     padding: 10px;
//     margin: 10px 0;
//     border-radius: 5px;
//     border: 1px solid #ccc;
// `;

// const buttonStyle = css`
//     background-color: #007bff;
//     color: white;
//     border: none;
//     padding: 10px 20px;
//     width: 100%;
//     border-radius: 5px;
//     cursor: pointer;
//     &:hover {
//         background-color: #0056b3;
//     }
// `;

// const SignUp = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const navigate = useNavigate();

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await signup(formData);
//             alert("Sign up successful!");
//             navigate('/');
//         } catch (error) {
//             console.error(error);
//             alert("Error signing up");
//         }
//     };

//     return (
//         <div css={containerStyle}>
//             <form onSubmit={handleSubmit} css={formStyle}>
//                 <h2>Create Account</h2>
//                 <input 
//                     type="text" 
//                     name="name" 
//                     value={formData.name} 
//                     onChange={handleChange} 
//                     placeholder="Name" 
//                     css={inputStyle}
//                 />
//                 <input 
//                     type="email" 
//                     name="email" 
//                     value={formData.email} 
//                     onChange={handleChange} 
//                     placeholder="Email" 
//                     css={inputStyle}
//                 />
//                 <input 
//                     type="password" 
//                     name="password" 
//                     value={formData.password} 
//                     onChange={handleChange} 
//                     placeholder="Password" 
//                     css={inputStyle}
//                 />
//                 <button type="submit" css={buttonStyle}>Sign Up</button>
//             </form>
//         </div>
//     );
// };

// export default SignUp;


/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { signup } from '../api/api';
import { useNavigate } from 'react-router-dom';

const signupStyles = css`
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
    width: 100%;
    max-width: 400px;
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

  .login-btn {
    background-color: #8360c3;
    margin-top: 1.5rem;
    color: white;
  }

  .login-btn:hover {
    background-color: #65489c;
  }

  .already-account {
    display: block;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .already-account:hover {
    color: #4caf50;
  }
`;

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            alert("Sign up successful!");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Error signing up");
        }
    };

    return (
        <div css={signupStyles}>
            <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Sign Up</button>
                <button type="button" className="login-btn" onClick={() => navigate('/')}>
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default SignUp;

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formStyles = css`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h2 {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 1.5rem;
    color: #0d6efd;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
    }

    button {
      padding: 0.8rem;
      background: #0d6efd;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

const AuthForm = ({ title, onSubmit }) => {
  return (
    <div css={formStyles}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;

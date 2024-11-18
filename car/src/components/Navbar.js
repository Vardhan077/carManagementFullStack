/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const navbarStyles = css`
  background-color: #0d6efd;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
  return (
    <div css={navbarStyles}>
      <h1>Car Manager</h1>
      <div>
        <a href="/dashboard">Dashboard</a>
        <a href="/add-car">Add Car</a>
      </div>
    </div>
  );
};

export default Navbar;

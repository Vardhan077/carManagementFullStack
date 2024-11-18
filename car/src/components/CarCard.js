/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cardStyles = css`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .content {
    padding: 1rem;
    font-family: 'Poppins', sans-serif;

    h3 {
      margin: 0;
      color: #0d6efd;
    }

    p {
      margin: 0.5rem 0;
      color: #6c757d;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      span {
        background: #0d6efd;
        color: white;
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
      }
    }
  }
`;

const CarCard = ({ car }) => {
  return (
    <div css={cardStyles}>
      <img src={car.images[0]} alt={car.title} />
      <div className="content">
        <h3>{car.title}</h3>
        <p>{car.description}</p>
        <div className="tags">
          {car.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCard;

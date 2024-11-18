/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { getCars, searchCars } from '../api/api';
import { Link } from 'react-router-dom';

const containerStyle = css`
    padding: 20px;
`;

const carCardStyle = css`
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const buttonStyle = css`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #218838;
    }
`;

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            const response = await getCars();
            console.log(response,"are carssssssssss")
            setCars(response.data);
        };
        fetchCars();
    }, []);

    const handleSearch = async () => {
        const response = await searchCars(search);
        setCars(response.data);
    };

    return (
        <div css={containerStyle}>
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search cars" 
                css={buttonStyle}
            />
            <button onClick={handleSearch} css={buttonStyle}>Search</button>
            {cars.map(car => (
                <div key={car._id} css={carCardStyle}>
                    <h3>{car.title}</h3>
                    <p>{car.description}</p>
                    <Link to={`/car/${car._id}`}>
                        <button css={buttonStyle}>View Details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CarList;

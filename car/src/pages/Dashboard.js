/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { getCars, searchCars, deleteCar, addCar, updateCar } from '../api/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'


const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [newCar, setNewCar] = useState({ title: '', description: '', image: '' });
  const [editCarData, setEditCarData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [randomLink , setRandomLink] = useState();

  const navigate = useNavigate();

  const token = Cookies.get('token');

  const fetchCars = async () => {
    try {
      const data = await getCars(token);
      setCars(data.data || []);
      setFilteredCars(data.data || []); // Initially, display all cars
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSearch = () => {
    // Safely filter the cars based on the search keyword
    const filtered = cars.filter(car => car.title && car.title.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredCars(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id, token);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleAddCar = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCar.title);
      formData.append('description', newCar.description);
      if (newCar.image) formData.append('image', newCar.image);

      if (isEditing) {
        await updateCar(editCarData._id, formData, token);
      } else {
        await addCar(formData, token);
      }

      fetchCars();
      setShowModal(false);
      setNewCar({ title: '', description: '', image: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/editing car:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCar((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewCar({ title: '', description: '', image: '' });
    setIsEditing(false);
  };

  const handleEditCar = (car) => {
    setEditCarData(car);
    setNewCar({ title: car.title, description: car.description, image: car.image });
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    handleSearch(); // Apply search filter whenever the keyword changes
  }, [keyword]);


  function getRandomPictureLink(pictureLinks) {
    if (!Array.isArray(pictureLinks) || pictureLinks.length === 0) {
      throw new Error('Provide a non-empty array of picture links.');
    }
  
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * pictureLinks.length);

    console.log(randomIndex,'is rrr ind')
  
    // Return the randomly chosen picture link
    return pictureLinks[randomIndex];
  }

  const pictureLinks = [
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906612/audi_z3dce6.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906586/benz_ukojdr.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906585/audi2_ygsgzj.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906584/audi1_ksntsh.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906584/lamb_yh6ghf.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906584/ferrari_lwlzaj.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731906584/ccar_kwkmmn.jpg',
    'https://res.cloudinary.com/dg9itycrz/image/upload/v1731835128/pexels-pixabay-35967_kkta5p.jpg'
  ];
  
 

  return (
    <div className='mainC'>
      <h1>My Cars</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search cars..."
      />
      <div>

        {filteredCars.map((car) => (
          <div key={car._id} className="car">
            <img src={car.image || getRandomPictureLink(pictureLinks)} alt={car.title} />
            <div className="car-title">{car.title}</div>
            <div className="car-price">{car.desciption}</div>
            <button onClick={() => navigate(`/cars/${car._id}`)}>View Details</button>
          </div>
        ))}
      </div>
      <button className="add-car-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Car' : 'Add Car'}</h2>
            <input
              type="text"
              name="title"
              value={newCar.title}
              onChange={handleInputChange}
              placeholder="Car Title"
            />
            <textarea
              name="description"
              value={newCar.description}
              onChange={handleInputChange}
              placeholder="Car Description"
            />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleAddCar}>{isEditing ? 'Save Changes' : 'Add Car'}</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


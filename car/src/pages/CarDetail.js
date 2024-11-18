

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { getCar, updateCar, deleteCar } from '../api/api';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import './CarDetails.css'



const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [newCarDetails, setNewCarDetails] = useState({ title: '', description: '', image: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [randomLink,setRandomLink] = useState();

  const navigate = useNavigate();

  const token = Cookies.get('token');

  const fetchCarDetails = async () => {
    try {
      const data = await getCar(carId, token);
      setCar(data.data);
      setNewCarDetails({
        title: data.data.title,
        description: data.data.description,
        image: data.data.image,
      });
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCarDetails.title);
      formData.append('description', newCarDetails.description);
      if (newCarDetails.image) formData.append('image', newCarDetails.image);

      await updateCar(carId, formData, token);
      fetchCarDetails();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await deleteCar(carId, token);
      window.location.href = '/dashboard'; // Redirect to cars list after deletion
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCarDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCarDetails((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewCarDetails({ title: '', description: '', image: '' });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);


  function getRandomPictureLink(pictureLinks) {
    if (!Array.isArray(pictureLinks) || pictureLinks.length === 0) {
      throw new Error('Provide a non-empty array of picture links.');
    }
  
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * pictureLinks.length);
  
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
    <div className='MainContainer'>
      {car ? (
        <div className="car-details">
            <button className="add-car-btn" onClick={() => navigate('/dashboard')}>
            &lt;
      </button>
      <div className='carContainer'>
          <h1>{car.title}</h1>
          <p>{car.description}</p>
          <img src={car.image || getRandomPictureLink(pictureLinks) } alt={car.title} />
          <div className="actions">
            <button onClick={() => { setIsEditing(true); setShowModal(true); }}>Edit</button>
            <button onClick={handleDeleteCar}>Delete</button>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Car</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newCarDetails.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newCarDetails.description}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            <div>
              <button onClick={handleUpdateCar}>Save</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;

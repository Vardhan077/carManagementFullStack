import axios from 'axios';

const API_URL = 'https://carmanagement-jv51.onrender.com'; // adjust to your backend URL

export const signup = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const getCars = () => axios.get(`${API_URL}/cars`);
export const searchCars = (query) => axios.get(`${API_URL}/cars/search`, { params: { query } });
export const getCar = (id) => axios.get(`${API_URL}/cars/${id}`);

  
// // API call to delete car
export const deleteCar = (id, token) => {
    return axios.delete(`${API_URL}/cars/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting car:', error);
      throw error;
    });
  };
  

export const addCar = (formData, token) => {
  return axios.post(`${API_URL}/add`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',  // Important for file uploads
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding car:', error);
      throw error;
    });
};

export const updateCar = (id, formData, token) => {
  return axios.put(`${API_URL}/cars/${id}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',  // Important for file uploads
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating car:', error);
      throw error;
    });
};

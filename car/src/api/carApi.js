import axios from 'axios';

const BASE_URL = 'https://carmanagement-jv51.onrender.com';

export const getCars = async (token) => {
  const response = await axios.get(`${BASE_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const searchCars = async (keyword, token) => {
  const response = await axios.get(`${BASE_URL}/cars/search?keyword=${keyword}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addCar = async (carData, token) => {
  const response = await axios.post(`${BASE_URL}/cars`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCarDetails = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateCar = async (id, updatedData, token) => {
  const response = await axios.put(`${BASE_URL}/cars/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteCar = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

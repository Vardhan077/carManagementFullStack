import axios from 'axios';

const BASE_URL = 'https://carmanagement-jv51.onrender.com';

export const signup = async (userData) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
};

export const login = async (userData) => {
  console.log("frontend",userData);
  const response = await axios.post(`${BASE_URL}/login`, userData);
  console.log("frontend",response,"in authAPI");
  return response.data;
};

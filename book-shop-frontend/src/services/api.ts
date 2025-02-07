import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export interface Product {
  _id: string;
  name: string;
  author: string;
  price: number;
  category: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}products`);
  return response.data;
};

export const getProductDetails = async (productId: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}products/${productId}`);
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}auth/login`, { email, password });
  return response.data.token;
};

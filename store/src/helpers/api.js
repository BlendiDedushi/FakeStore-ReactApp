import axios from "axios";

export async function getProducts() {
  const api = `https://fakestoreapi.com/products`;
  const response = await axios.get(api);
  const { data } = response;
  return data;
}

export async function getProductById(id) {
  const api = `https://fakestoreapi.com/products/${id}`;
  const response = await axios.get(api);
  const { data } = response;
  return data;
}

export async function getCategories() {
  const api = `https://fakestoreapi.com/products/categories`;
  const response = await axios.get(api);
  const { data } = response;
  return data;
}

export async function getProductsByCategory(category) {
  const api = `https://fakestoreapi.com/products/category/${category}`;
  const response = await axios.get(api);
  const { data } = response;
  return data;
}
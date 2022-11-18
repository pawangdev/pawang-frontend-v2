import axios from "./config";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`/categories`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getCategoryByID = async (id) => {
  try {
    const response = await axios.get(`/categories/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createCategory = async (id, payload) => {
  try {
    const response = await axios.get(`/categories/create/${id}`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateCategory = async (id, subcategoryId, payload) => {
  try {
    const response = await axios.put(
      `/categories/update/${id}/${subcategoryId}`,
      payload
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteCategory = async (id, subcategoryId) => {
  try {
    const response = await axios.delete(
      `/categories/delete/${id}/${subcategoryId}`
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

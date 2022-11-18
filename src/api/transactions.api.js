import axios from "./config";

export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`/transactions`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getTransactionByID = async (id) => {
  try {
    const response = await axios.get(`/transactions/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createTransaction = async (payload) => {
  try {
    const response = await axios.post(`/transactions/create`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateTransaction = async (id, payload) => {
  try {
    const response = await axios.put(`/transactions/update/${id}`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`/transactions/delete/${id}`);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

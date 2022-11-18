import axios from "./config";

export const getAllWallets = async () => {
  try {
    const response = await axios.get(`/wallets`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getWalletByID = async (id) => {
  try {
    const response = await axios.get(`/wallets/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createWallet = async (payload) => {
  try {
    const response = await axios.post(`/wallets/create`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateWallet = async (id, payload) => {
  try {
    const response = await axios.put(`/wallets/update/${id}`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteWallet = async (id) => {
  try {
    const response = await axios.delete(`/wallets/delete/${id}`);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

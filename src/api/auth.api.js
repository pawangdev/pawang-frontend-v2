import axios from "./config";

export const userRegister = async (payload) => {
  try {
    const response = await axios.post("/auth/register", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userLogin = async (payload) => {
  try {
    const response = await axios.post("/auth/login", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userLoginWithGoogle = async (payload) => {
  try {
    const response = await axios.post("/auth/login/google", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userChangePassword = async (payload) => {
  try {
    const response = await axios.post("/auth/change-password", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userChangeProfile = async (payload) => {
  try {
    const response = await axios.post("/auth/change-profile", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userResetPasswordRequest = async (payload) => {
  try {
    const response = await axios.post("/auth/reset-password/request", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userResetPasswordVerify = async (payload) => {
  try {
    const response = await axios.post("/auth/reset-password/verify", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userResetPassword = async (payload) => {
  try {
    const response = await axios.post("/auth/reset-password", payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const userProfile = async () => {
  try {
    const response = await axios.get("/auth/profile");
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

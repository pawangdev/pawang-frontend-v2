import axios from "./config";

export const getAllTaskReminders = async () => {
  try {
    const response = await axios.get(`/task-reminders`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getTaskReminderByID = async (id) => {
  try {
    const response = await axios.get(`/task-reminders/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createTaskReminder = async (payload) => {
  try {
    const response = await axios.post(`/task-reminders/create`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateTaskReminder = async (id, payload) => {
  try {
    const response = await axios.put(`/task-reminders/update/${id}`, payload);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteTaskReminder = async (id) => {
  try {
    const response = await axios.delete(`/task-reminders/delete/${id}`);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

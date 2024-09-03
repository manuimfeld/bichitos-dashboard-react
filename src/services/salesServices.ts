import axios from "axios";

const getToken = () => localStorage.getItem("authorization");

export const fetchSalesToday = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/sales/today`,
      {
        headers: {
          authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

export const fetchAllSales = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/sales-month`,
      {
        headers: {
          authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

export const fetchAllExpenses = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/expenses-month`,
      {
        headers: {
          authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses", error);
    throw error;
  }
};
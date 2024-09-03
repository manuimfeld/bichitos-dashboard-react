import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  const token = localStorage.getItem("authorization");
  return token;
}

export const deleteSale = async (saleId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/sales/${saleId}`, {
      headers: {
        authorization: `${getToken()}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw error;
  }
};

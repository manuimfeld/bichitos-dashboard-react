import { getApiHeaders } from "@/lib/apiHeaders";
import { ExpensesSummary } from "@/types/expenses";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getExpensesMonth = async (): Promise<ExpensesSummary> => {
  try {
    const response = await axios.get(
      `${API_URL}/expenses/summary/month`,
      getApiHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses", error);
    throw error;
  }
};

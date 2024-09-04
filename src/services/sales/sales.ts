import { getApiHeaders } from "@/lib/apiHeaders";
import { Sale, SalesSummary } from "@/types/sales";
import axios from "axios"

const API_URL = "http://localhost:3001/api";

export const getSalesToday = async (): Promise<Sale[]> => {
  try {  
    const response = await axios.get(`${API_URL}/sales`, getApiHeaders())
    return response.data as Sale[];
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
    }
}

export const getSalesThisMonth = async (): Promise<SalesSummary> => {
    try {  
      const response = await axios.get(`${API_URL}/sales/summary/month`, getApiHeaders())
      return response.data as SalesSummary
    } catch (error) {
      console.error("Error fetching sales", error);
      throw error;
      }
  }
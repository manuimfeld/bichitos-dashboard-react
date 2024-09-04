import { getApiHeaders } from "@/lib/apiHeaders";
import { Sale, SalesSummary } from "@/types/sales";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getSalesToday = async (): Promise<Sale[]> => {
  try {
    const response = await axios.get(`${API_URL}/sales/today`, getApiHeaders());
    return response.data as Sale[];
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

export const getSalesMonth = async (): Promise<SalesSummary> => {
  try {
    const response = await axios.get(
      `${API_URL}/sales/summary/month`,
      getApiHeaders()
    );
    return response.data as SalesSummary;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

interface DeleteSaleParams {
  sale_id: number;
}

export const deleteSale = async ({ sale_id }: DeleteSaleParams) => {
  try {
    const response = await axios.delete(
      `${API_URL}/sales/${sale_id}`,
      getApiHeaders()
    );
    return response;
  } catch (error) {
    console.error("Error al eliminar la venta", error);
    throw error;
  }
};

import { create } from "zustand";
import { fetchSalesToday, fetchSalesMonth } from "../services/salesServices";
import { getSalesThisMonth, getSalesToday } from "@/services/sales/sales";
import { getExpensesMonth } from "@/services/expenses/expenses";
import { StoreState } from "@/types/store";

const useStore = create<StoreState>((set) => ({
  salesToday: [],
  salesMonth: { total_sales: null, total_sales_count: "0" },
  expensesMonth: { total_expenses_amount: null, total_expenses_count: "0" },
  error: null,
  loadingToday: false,
  loadingExpenses: false,
  loadingAll: false,
  dataLoaded: false,

  fetchSalesToday: async () => {
    set({ loadingToday: true, error: null });
    try {
      const data = await getSalesToday();
      set({ salesToday: data });
    } catch (error) {
      set({ error: "Error fetching today's sales" });
      throw error;
    } finally {
      set({ loadingToday: false });
    }
  },
  fetchAllSalesMonth: async () => {
    set({ loadingAll: true, error: null });
    try {
      const data = await getSalesThisMonth();
      set({ salesMonth: data });
    } catch (error) {
      set({ error: "Error fetching all sales" });
      throw error;
    } finally {
      set({ loadingAll: false });
    }
  },
  fetchExpensesMonth: async () => {
    set({ loadingExpenses: true, error: null });
    try {
      const data = await getExpensesMonth();
      set({ expensesMonth: data });
    } catch (error) {
      set({ error: "Error fetching expenses" });
      throw error;
    } finally {
      set({ loadingExpenses: false });
    }
  },
  fetchAllData: async () => {
    set({
      loadingToday: true,
      loadingExpenses: true,
      loadingAll: true,
      error: null,
    });
    try {
      const [salesToday, salesMonth, expensesMonth] = await Promise.all([
        fetchSalesToday(),
        fetchSalesMonth(),
        getExpensesMonth(),
      ]);
      set({ salesToday, salesMonth, expensesMonth });
    } catch (error) {
      set({ error: "Error fetching data" });
      throw error;
    } finally {
      set({
        loadingToday: false,
        loadingExpenses: false,
        loadingAll: false,
        dataLoaded: true,
      });
    }
  },
}));

export default useStore;

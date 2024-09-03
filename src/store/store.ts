import { create } from "zustand";
import {
  fetchSalesToday,
  fetchAllSales,
  fetchAllExpenses,
} from "../services/salesServices";

const useStore = create((set) => ({
  salesToday: [],
  allSales: [],
  allExpenses: [],
  error: null,
  loadingToday: false,
  loadingExpenses: false,
  loadingAll: false,
  dataLoaded: false,

  fetchSalesToday: async () => {
    set({ loadingToday: true, error: null });
    try {
      const data = await fetchSalesToday();
      set({ salesToday: data });
    } catch (error) {
      set({ error: "Error fetching today's sales" });
    } finally {
      set({ loadingToday: false });
    }
  },

  fetchExpensesMonth: async () => {
    set({ loadingExpenses: true, error: null });
    try {
      const data = await fetchAllExpenses();
      set({ allExpenses: data });
    } catch (error) {
      set({ error: "Error fetching expenses" });
    } finally {
      set({ loadingExpenses: false });
    }
  },

  fetchAllSales: async () => {
    set({ loadingAll: true, error: null });
    try {
      const data = await fetchAllSales();
      set({ allSales: data });
    } catch (error) {
      set({ error: "Error fetching all sales" });
    } finally {
      set({ loadingAll: false });
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
      const [salesToday, allExpenses, allSales] = await Promise.all([
        fetchSalesToday(),
        fetchAllExpenses(),
        fetchAllSales(),
      ]);
      set({ salesToday, allExpenses, allSales });
    } catch (error) {
      set({ error: "Error fetching data" });
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
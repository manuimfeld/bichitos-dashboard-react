import { create } from "zustand";
import {
  getSalesMonth,
  getSalesToday,
  getSalesYear,
} from "@/services/sales/sales";
import { getExpensesMonth } from "@/services/expenses/expenses";
import { StoreState } from "@/types/store";

const useStore = create<StoreState>((set) => ({
  salesToday: [],
  salesMonth: { total_sales: null, total_sales_count: 0 },
  expensesMonth: { total_expenses_amount: null, total_expenses_count: 0 },
  salesYear: [],
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
      const data = await getSalesMonth();
      set({ salesMonth: data });
    } catch (error) {
      set({ error: "Error fetching all sales" });
      throw error;
    } finally {
      set({ loadingAll: false });
    }
  },
  fetchAllSalesYear: async () => {
    set({ loadingAll: true, error: null });
    try {
      const data = await getSalesYear();
      set({ salesYear: data });
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
      const [salesToday, salesMonth, salesYear, expensesMonth] =
        await Promise.all([
          getSalesToday(),
          getSalesMonth(),
          getSalesYear(),
          getExpensesMonth(),
        ]);

      set({ salesToday, salesMonth, salesYear, expensesMonth });
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

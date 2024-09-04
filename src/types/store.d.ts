import { ExpensesSummary } from "./expenses";
import { Sale, SalesSummary } from "./sales";

interface StoreState {
  salesToday: Sale[],
  salesMonth: SalesSummary,
  expensesMonth: ExpensesSummary,
  error: string | null,
  loadingToday: boolean,
  loadingExpenses: boolean,
  loadingAll: boolean,
  dataLoaded: boolean,
  fetchSalesToday: () => Promise<void>,
  fetchExpensesMonth: () => Promise<void>,
  fetchAllSalesMonth: () => Promise<void>,
  fetchAllData: () => Promise<void>
}
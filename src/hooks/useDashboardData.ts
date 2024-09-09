import { useEffect } from "react";
import useStore from "../store/store";

const useDashboardData = () => {
  const {
    salesToday,
    salesMonth,
    salesYear,
    expensesMonth,
    error,
    loadingToday,
    loadingExpenses,
    dataLoaded,
    loadingAll,
    fetchAllData,
    fetchAllSalesYear,
  } = useStore((state) => ({
    salesToday: state.salesToday,
    salesMonth: state.salesMonth,
    salesYear: state.salesYear,
    expensesMonth: state.expensesMonth,
    error: state.error,
    loadingToday: state.loadingToday,
    loadingExpenses: state.loadingExpenses,
    dataLoaded: state.dataLoaded,
    loadingAll: state.loadingAll,
    fetchAllSalesYear: state.fetchAllSalesYear,
    fetchAllData: state.fetchAllData,
  }));

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) {
      alert("Redirigiendo a /login");
    } else if (!dataLoaded) {
      fetchAllData(); // Fetch all data when component mounts
    }
  }, [fetchAllData, dataLoaded]);

  return {
    salesToday,
    salesMonth,
    expensesMonth,
    salesYear,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
    dataLoaded,
  };
};

export default useDashboardData;

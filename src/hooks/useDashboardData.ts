import { useEffect } from "react";
import useStore from "../store/store";

const useDashboardData = () => {
  const {
    salesToday,
    allSales,
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    dataLoaded,
    loadingAll,
    fetchAllData,
  } = useStore((state) => ({
    salesToday: state.salesToday,
    allSales: state.allSales,
    allExpenses: state.allExpenses,
    error: state.error,
    loadingToday: state.loadingToday,
    loadingExpenses: state.loadingExpenses,
    dataLoaded: state.dataLoaded,
    loadingAll: state.loadingAll,
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
    allSales,
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
    dataLoaded,
  };
};

export default useDashboardData;
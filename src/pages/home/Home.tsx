import useDashboardData from "@/hooks/useDashboardData";
import { DashboardSummary } from "./components/dashboardSummary";

export const Home = () => {
  const {
    salesToday,
    allSales,
    allExpenses,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
  } = useDashboardData();

  console.log({ salesToday, allSales, allExpenses, error, loadingToday, loadingExpenses, loadingAll });


  if (loadingToday || loadingExpenses || loadingAll) {
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <h1>CARGANDO</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <p>{error} ERROR</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-between gap-3">
      <DashboardSummary
        salesToday={salesToday}
        allSales={allSales}
        allExpenses={allExpenses}
      />
    </div>
  );
};
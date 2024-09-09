import useDashboardData from "@/hooks/useDashboardData";
import { DashboardSummary } from "./components/dashboardSummary";
import { ChartSalesCount } from "./components/chartSalesCount";

export const Home = () => {
  const {
    salesToday,
    salesMonth,
    expensesMonth,
    error,
    loadingToday,
    loadingExpenses,
    loadingAll,
  } = useDashboardData();

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
        salesMonth={salesMonth}
        expensesMonth={expensesMonth}
        error={error}
        loadingToday={loadingToday}
        loadingExpenses={loadingExpenses}
        loadingAll={loadingAll}
      />
      <ChartSalesCount />
    </div>
  );
};

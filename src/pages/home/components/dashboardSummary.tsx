import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSummary = ({
  salesToday,
  allSales,
  allExpenses,
  loadingToday,
  loadingExpenses,
  loadingAll,
  error,
}) => {
  if (loadingToday || loadingExpenses || loadingAll)
    return (
      <>
        <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="icon bg-teal-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m-4-4h8"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ingresos del mes
            </h2>
            <Skeleton className="mt-2 h-[26px] w-full" />
          </div>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="icon bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m-4-4h8"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ventas del mes
            </h2>
            <Skeleton className="mt-2 h-[26px] w-full" />
          </div>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="icon bg-red-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m-4-4h8"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Gastos del mes
            </h2>
            <Skeleton className="mt-2 h-[26px] w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white bg-opacity-20 shadow-lg rounded-lg p-4 backdrop-filter backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-gray-800 ">
              Últimas 5 Ventas
            </h2>
            <table className="w-full table-fixed text-center">
              <thead>
                <tr className="text-gray-500 uppercase text-sm">
                  <th className="w-1/3 py-2">Monto</th>
                  <th className="w-1/3 py-2">Método de Pago</th>
                  <th className="w-1/3 py-2">Turno</th>
                </tr>
              </thead>
              <tbody className="text-black text-opacity-80 select-none">
                <tr className="border-b border-gray-200">
                  <td className="py-2">
                    <Skeleton className="mx-auto mt-2 h-[26px] w-1/4" />
                  </td>
                  <td className="py-2">
                    {" "}
                    <Skeleton className="mx-auto mt-2 h-[26px] w-1/4" />
                  </td>
                  <td className="py-2">
                    {" "}
                    <Skeleton className="mx-auto mt-2 h-[26px] w-1/4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <div className="flex flex-wrap justify-between gap-3">
        <p>{error}</p>;
      </div>
    );

  // Get the latest 5 sales of the day
  const latestSalesToday = salesToday.slice(-5);

  return (
    <>
      <div className="card bg-white dark:bg-[#020817] shadow-lg rounded-lg p-6 flex items-center">
        <div className="icon bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-teal-500 dark:text-teal-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Ingresos del mes
          </h2>
          <p
            id="ingresos-mes"
            className="text-3xl font-bold text-green-500 dark:text-green-400 mt-2"
          >
            $
            {Intl.NumberFormat(
              ("es-AR",
              {
                style: "currency",
                currency: "ARS",
              })
            ).format(allSales.total_sales)}
          </p>
        </div>
      </div>
      <div className="card bg-white dark:bg-[#020817] shadow-lg rounded-lg p-6 flex items-center">
        <div className="icon bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500 dark:text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Ventas del mes
          </h2>
          <p
            id="numero-ventas"
            className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-2"
          >
            {allSales.total_sales_count} ventas
          </p>
        </div>
      </div>
      <div className="card bg-white dark:bg-[#020817] shadow-lg rounded-lg p-6 flex items-center">
        <div className="icon bg-red-100 dark:bg-red-900 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 dark:text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v8m-4-4h8"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Gastos del mes
          </h2>
          <p
            id="gastos-mes"
            className="text-3xl font-bold text-red-500 dark:text-red-400 mt-2"
          >
            $
            {Intl.NumberFormat(
              ("es-AR",
              {
                style: "currency",
                currency: "ARS",
              })
            ).format(allExpenses.total_expenses_amount)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-[#020817] bg-opacity-20 shadow-lg rounded-lg p-4 backdrop-filter backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Últimas 5 Ventas
          </h2>
          <table className="w-full table-fixed text-center">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 uppercase text-sm">
                <th className="w-1/3 py-2">Monto</th>
                <th className="w-1/3 py-2">Método de Pago</th>
                <th className="w-1/3 py-2">Turno</th>
              </tr>
            </thead>
            <tbody className="text-black dark:text-white text-opacity-80 select-none">
              {latestSalesToday.map((sale, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2">
                    {Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(sale.amount)}
                  </td>
                  <td className="py-2">{sale.payment_method}</td>
                  <td className="py-2">{sale.turn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

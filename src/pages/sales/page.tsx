import { useEffect, useState } from "react";
import reduceAmount from "@/lib/reduceAmount";
import { DataTable } from "./components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartPie } from "./components/chart";
import useStore from "../../store/store";
import { columns } from "./components/columns";

export const Sales = () => {
  const { salesToday, error, loadingToday, fetchSalesToday } = useStore(
    (state) => ({
      salesToday: state.salesToday,
      error: state.error,
      loadingToday: state.loadingToday,
      fetchSalesToday: state.fetchSalesToday,
    })
  );
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    
      fetchSalesToday()
    
  }, []);

  if (loadingToday)
    return (
      <>
        <div className="lg:gap-4 flex flex-wrap lg:justify-normal text-black dark:text-white text-xs mx-auto lg:mx-0 lg:w-full lg:max-h-[calc(100%_-_48px)]">
          <h3 className="text-2xl py-2 w-full">Historial de ventas</h3>
          <Skeleton className="h-[150px] w-full lg:w-1/2 mt-4" />
          <Skeleton className="h-[150px]  w-full lg:w-1/4 mt-4" />
        </div>
      </>
    );

  if (error)
    return (
      <div className="text-black text-xs bg-white col-span-2 row-start-2 overflow-y-auto w-[calc(100%_-_32px)] mx-auto lg:mx-0 lg:w-full">
        <p>Ha ocurrido un error, por favor inicia sesión</p>
        <a
          href="/login"
          className="inline-block mt-2 px-2 py-2 bg-[#039ABD] rounded-full text-white"
        >
          Iniciar sesión
        </a>
      </div>
    );

  return (
    <div className="lg:gap-4 flex flex-wrap lg:justify-normal text-black text-xs mx-auto lg:mx-0 lg:w-full lg:max-h-[calc(100%_-_48px)]">
      <h3 className="text-2xl py-2 w-full">Historial de ventas</h3>
      {/* <DataTable
        columns={columns}
        data={salesToday}
        
      /> */}
      <ChartPie data={salesToday} totalAmount={reduceAmount(salesToday)} />
    </div>
  );
}

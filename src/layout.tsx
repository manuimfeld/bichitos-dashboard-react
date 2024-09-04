import { Outlet } from "react-router";
import { AsideMenu } from "./components/asideMenu/AsideMenu";
import { Header } from "./components/header/Header";

export const Layout = () => {
  return (
    <div className="h-screen w-screen grid grid-cols-[19vw_auto] grid-rows-[48px_1fr] bg-[#FBF7F3] dark:bg-[#0C0D14] dark:text-white text-black">
      <Header />
      <AsideMenu />
      <main className="px-4 col-start-1 col-end-3 row-start-2 md:col-start-2 md:row-start-2 text-black dark:text-white text-xs overflow-y-auto w-[calc(100%_-_32px)] mx-auto mt-4 lg:mx-0 lg:w-full">
        <Outlet />
      </main>
    </div>
  );
};
